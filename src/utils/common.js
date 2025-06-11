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

export function handleImageChange({ e, setImages, existingImages = [] }) {
  const files = Array.from(e.target.files);

  // Filter out existing images to avoid duplicates
  const filtered = files.filter(
    (file) =>
      !existingImages.some(
        (img) => img.file.name === file.name && img.file.size === file.size
      )
  );

  const newImages = filtered.map((file) => ({
    file,
    preview: URL.createObjectURL(file), // Show image preview
  }));

  setImages((prev) => [...prev, ...newImages]);
}
