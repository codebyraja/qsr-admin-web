import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "feather-icons-react/build/IconComponents";
import { toast } from "react-toastify";

// Constants & Utilities
import { all_routes } from "../Router/all_routes";
import {
  generateSlug,
  handleImageChange,
  handleRemoveImage,
} from "../utils/common";
import { API_BASE_URL } from "../environment";
import {
  DISCOUNT_TYPES as discountType,
  PRODUCT_TYPES as productType,
  TAX_TYPES as taxType,
} from "../constants";

// UI Components
import Loader from "../components/loader/loader";
import ProductInfo from "../components/product/ProductInfo";
import PricingStock from "../components/product/PricingStock";
import ProductImages from "../components/product/ProductImages";
import AddUnits from "../components/modals/addUnit";
import AddCategorys from "../components/modals/addCategory";
import RefreshIcon from "../core/common/tooltip-content/refresh";
import CollapesIcon from "../core/common/tooltip-content/collapes";
import { useDropdownState } from "../utils/useDropdownState";

const defaultFormData = {
  code: 0,
  productName: "",
  printName: "",
  parentGrp: 0,
  productSlug: "",
  sku: "",
  unit: "",
  description: "",
  productType: 0,
  productTypeName: "",
  qty: 0,
  minQty: 0,
  price: 0,
  discount: 0,
  taxType: 0,
  taxTypeName: "",
  discountType: "",
  discountTypeName: "",
  isActive: true,
  masterType: 6,
  users: "string",
  images: [],
};

const AddProduct = () => {
  const { productlist } = all_routes;
  const location = useLocation();
  const navigate = useNavigate();
  const product = location?.state?.product;

  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [unit, setUnit] = useState([]);
  const [images, setImages] = useState([]);

  const {
    dropdowns,
    setDropdowns,
    getValue,
    getLabel,
    clear: clearDropdowns,
  } = useDropdownState({
    selectedCategory: null,
    selectedUnit: null,
    selectedProductType: null,
    selectedTaxType: null,
    selectedDiscountType: null,
  });

  // Initialize Form from Passed Product (for edit/view mode)
  useEffect(() => {
    if (product) {
      const getProductDetails = async () => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/GetProductMasterDetails/6?code=${product?.code}`
          );
          const result = await response.json();
          console.log("result", result);
          const formattedProduct = {
            ...defaultFormData,
            code: result?.data[0]?.code,
            productName: result?.data[0]?.name,
            printName: result?.data[0]?.printName,
            productSlug: result?.data[0]?.slug ?? generateSlug(formData?.name),
            sku: result?.data[0]?.sku,
            qty: result?.data[0]?.qty,
            minQty: result?.data[0]?.minQty,
            price: result?.data[0]?.price,
            discount: result?.data[0]?.discount,
            description: result?.data[0]?.description,
            isActive: result?.data[0]?.isActive,
            images: result?.data[0]?.imagePaths || [],
          };
          setDropdowns({
            selectedCategory: {
              value: result?.data[0]?.parentGrp,
              label: result?.data[0]?.parentGrpName,
            },
            selectedUnit: {
              value: result?.data[0]?.unit,
              label: result?.data[0]?.unitName,
            },
            selectedProductType: {
              value: result?.data[0]?.productType,
              label: result?.data[0]?.productTypeName,
            },
            selectedTaxType: {
              value: result?.data[0]?.taxType,
              label: result?.data[0]?.taxTypeName,
            },
            selectedDiscountType: {
              value: result?.data[0]?.discountType,
              label: result?.data[0]?.discountTypeName,
            },
          });
          setFormData(formattedProduct);

          setFormData(formattedProduct);

          // ✅ Set images using preview + dummy file
          const imageObjs = result?.data[0]?.imageList.map((img, index) => ({
            file: new File([""], img.fileName, {
              type: img.fileType,
            }),
            preview: img.filePath,
            id: index,
            isExisting: true, // mark it so backend keeps it
          }));

          setImages(imageObjs);
        } catch (ex) {
          toast.error(ex);
        } finally {
          setIsLoading(false);
        }
      };
      getProductDetails();
    }
  }, [product]);

  useEffect(() => {
    async function prepareImages() {
      if (product) {
        const fileList = [];

        for (const image of images) {
          try {
            const file = await urlToFile(image.url, image.name, image.type);
            fileList.push(file);
          } catch (error) {
            console.error("Failed to load image:", image.url, error);
          }
        }

        setImages(fileList); // File[] list set in state
      }
    }

    prepareImages();
  }, [product]);

  console.log("imgggggggggggggggg", images);

  async function urlToFile(url, filename, mimeType) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
  }

  useEffect(() => {
    getselectList(5); // Categories
    getselectList(8); // Units
    if (!product) generateSKU(); // Generate SKU only for new products
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "productName" && { productSlug: generateSlug(value) }),
    }));
  };

  const handleDropdownChange = (name, selectedOption) => {
    const value = setDropdowns(name, selectedOption);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    navigate(-1);
    setFormData(defaultFormData);
    clearDropdowns();
    setImages([]);
  };

  const getselectList = async (type) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/GetMasterList/${type}`);
      const { data } = await response.json();
      if (type === 5) setCategory(data);
      if (type === 8) setUnit(data);
    } catch {
      toast.error("Failed to fetch master list");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSKU = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/GenerateSku/generate-sku`);
      const { sku } = await res.json();
      setFormData((prev) => ({ ...prev, sku }));
    } catch {
      toast.error("Failed to generate SKU");
    } finally {
      setIsLoading(false);
    }
  };

  console.log("ram images", images);

  const appendFormData = () => {
    console.log("ram images2", images);

    const fd = new FormData();

    const fields = {
      Code: formData.code,
      Name: formData.productName,
      PrintName: formData.productName,
      ParentGrp: getValue("selectedCategory"),
      Unit: getValue("selectedUnit"),
      ProductType: getValue("selectedProductType"),
      ProductTypeName: getLabel("selectedProductType"),
      TaxType: getValue("selectedTaxType"),
      TaxTypeName: getLabel("selectedTaxType"),
      DiscountType: getValue("selectedDiscountType"),
      DiscountTypeName: getLabel("selectedDiscountType"),
      Description: formData.description,
      Qty: formData.qty,
      MinQty: formData.minQty,
      Price: formData.price,
      Discount: formData.discount,
      Slug: formData.productSlug,
      Sku: formData.sku,
      IsActive: formData.isActive ? "true" : "false",
      MasterType: formData.masterType,
      Users: formData.users,
    };

    Object.entries(fields).forEach(([key, val]) => {
      fd.append(key, val ?? "");
    });

    // images.forEach((img) => {
    //   if (img.file) {
    //     fd.append("Images", img.file);
    //   }
    // });

    // Append only actual image files
    images.forEach((img) => {
      if (img?.file instanceof File) {
        fd.append("Images", img.file);
      }
    });

    // ✅ Append existing image paths as array
    const existingImagePaths = images
      .filter((img) => img?.isExisting && img.preview)
      .map((img) => img.preview);

    if (existingImagePaths.length > 0) {
      existingImagePaths.forEach((path) => {
        fd.append("ExistingImagePaths", path);
      });
    }

    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const formPayload = appendFormData();

      for (let pair of formPayload.entries()) {
        console.log("ramji", `${pair[0]}:`, pair[1]);
      }

      const response = await fetch(`${API_BASE_URL}/SaveProductMasterDetails`, {
        method: "POST",
        body: formPayload,
      });

      const result = await response.json();

      if (result?.status === 1) {
        handleClear();
        toast.success(result.msg || "Product added successfully");
        generateSKU();
      } else {
        toast.error(result.msg || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to add product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>{product ? "Edit Product" : "Create Product"}</h4>
                <h6>
                  {product ? "Edit existing product" : "Create new product"}
                </h6>
              </div>
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
              <CollapesIcon />
              <li>
                <div className="page-btn">
                  <Link to={productlist} className="btn btn-secondary">
                    <ArrowLeft className="me-2" /> Back to Product
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          <form className="add-product-form" onSubmit={handleSubmit}>
            <div className="add-product">
              <ProductInfo
                formData={formData}
                handleChange={handleChange}
                generateSKU={generateSKU}
                dropdowns={dropdowns}
                setDropdowns={setDropdowns}
                unit={unit}
                category={category}
                isLoading={isLoading}
              />

              <PricingStock
                formData={formData}
                handleChange={handleChange}
                options={{ productType, taxType, discountType }}
                dropdowns={dropdowns}
                setDropdowns={setDropdowns}
                isLoading={isLoading}
              />

              <ProductImages
                images={images}
                setImages={setImages}
                handleImageChange={(e) =>
                  handleImageChange({ e, setImages, existingImages: images })
                }
                handleRemoveImage={(index) =>
                  handleRemoveImage({ images, setImages, index })
                }
                isLoading={isLoading}
              />
            </div>

            <div className="col-lg-12">
              <div className="d-flex justify-content-end mb-4">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  disabled={isLoading}
                  onClick={handleClear}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {product ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0 text-gray-9">
            2014 - 2025 © NXI. All Right Reserved
          </p>
          <p>
            Designed & Developed by{" "}
            <Link to="#" className="text-primary">
              Xcel Technology
            </Link>
          </p>
        </div>
      </div>

      <AddUnits />
      <AddCategorys />
    </>
  );
};

export default AddProduct;
