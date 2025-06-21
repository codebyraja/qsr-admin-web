export function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special chars with -
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing -
}

export function handleRemoveImage({ images, setImages, index }) {
  const newImages = [...images];
  URL.revokeObjectURL(newImages[index].preview);
  newImages.splice(index, 1);
  setImages(newImages);
}

// export function handleImageChange({ e, setImages, existingImages = [] }) {
//   const files = Array.from(e.target.files);

//   // Filter out existing images to avoid duplicates
//   const filtered = files.filter(
//     (file) =>
//       !existingImages.some(
//         (img) => img.file.name === file.name && img.file.size === file.size
//       )
//   );

//   const newImages = filtered.map((file) => ({
//     file,
//     preview: URL.createObjectURL(file), // Show image preview
//   }));

//   setImages((prev) => [...prev, ...newImages]);
// }

export const handleImageChange = async ({
  e,
  setImages,
  existingImages = [],
}) => {
  const files = Array.from(e.target.files);
  const updatedImages = [...existingImages];

  for (const file of files) {
    let convertedFile = file;

    // Convert WebP to JPG using canvas
    if (file.type === "image/webp") {
      const imageBitmap = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(imageBitmap, 0, 0);

      const blob = await new Promise(
        (resolve) => canvas.toBlob(resolve, "image/jpeg", 0.95) // 95% quality JPG
      );

      convertedFile = new File([blob], file.name.replace(/\.webp$/, ".jpg"), {
        type: "image/jpeg",
      });
    }

    const preview = URL.createObjectURL(convertedFile);
    updatedImages.push({ file: convertedFile, preview });
  }

  setImages(updatedImages);
};

const getMimeTypeFromExtension = (filename) => {
  const ext = filename?.split(".").pop()?.toLowerCase();
  const types = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
  };
  return types[ext] || "application/octet-stream";
};

export const loadImagesFromServer = async (imageList) => {
  const imageObjs = await Promise.all(
    imageList.map(async (img, index) => {
      try {
        const response = await fetch(img.filePath);
        const blob = await response.blob();

        // Get file extension & fallback type
        const fileExt = img.fileName?.split(".").pop()?.toLowerCase();
        const fallbackMime = getMimeTypeFromExtension(img.fileName);
        const actualMime = blob.type || fallbackMime;

        // Fix filename extension if blob is not matching expected
        let fixedFileName = img.fileName;

        // Case: webp was converted to jpg on save
        if (fileExt === "webp" && actualMime === "image/jpeg") {
          fixedFileName = img.fileName.replace(/\.webp$/, ".jpg");
        }

        const file = new File([blob], fixedFileName, {
          type: actualMime,
        });

        const preview = URL.createObjectURL(file);

        return {
          file,
          preview,
          id: index,
          isExisting: true,
        };
      } catch (err) {
        console.error("❌ Failed to load image:", img.filePath, err);
        return null;
      }
    })
  );

  return imageObjs.filter(Boolean); // Remove failed items
};
