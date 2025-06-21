// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "feather-icons-react/build/IconComponents";
import { toast } from "react-toastify";

// Constants & Utilities
import { all_routes } from "../Router/all_routes";
import {
  generateSlug,
  handleImageChange as baseHandleImageChange,
  handleRemoveImage,
  convertWebPToJPG,
  loadImagesFromServer,
  fetchImageFiles,
} from "../utils/common";
import { API_BASE_URL } from "../environment";
import { DISCOUNT_TYPES, PRODUCT_TYPES, TAX_TYPES } from "../constants";
import { useDropdownState } from "../utils/useDropdownState";
import { useMasterList } from "../hooks/useMasterList";

// UI Components
import Loader from "../components/loader/loader";
import ProductInfo from "../components/product/ProductInfo";
import PricingStock from "../components/product/PricingStock";
import ProductImages from "../components/product/ProductImages";
import AddUnits from "../components/modals/addUnit";
import AddCategorys from "../components/modals/addCategory";
import RefreshIcon from "../core/common/tooltip-content/refresh";
import CollapesIcon from "../core/common/tooltip-content/collapes";
import { generateFormData } from "../utils/formUtils";

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
  qty: "",
  minQty: "",
  price: "",
  discount: "",
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
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { list: category } = useMasterList(5);
  const { list: unit } = useMasterList(8);

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

  useEffect(() => {
    if (product) {
      fetchProductDetails(product?.code);
    } else {
      generateSKU();
    }
    // eslint-disable-next-line
  }, [product]);

  const fetchProductDetails = async (code) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/GetProductMasterDetails/6?code=${code}`
      );
      const result = await res.json();
      const data = result?.data[0];

      const formatted = {
        ...defaultFormData,
        code: data.code,
        productName: data.name,
        printName: data.printName,
        productSlug: data.slug ?? generateSlug(data.name),
        sku: data.sku,
        qty: data.qty,
        minQty: data.minQty,
        price: data.price,
        discount: data.discount,
        description: data.description,
        isActive: data.isActive,
      };

      setDropdowns({
        selectedCategory: { value: data.parentGrp, label: data.parentGrpName },
        selectedUnit: { value: data.unit, label: data.unitName },
        selectedProductType: {
          value: data.productType,
          label: data.productTypeName,
        },
        selectedTaxType: { value: data.taxType, label: data.taxTypeName },
        selectedDiscountType: {
          value: data.discountType,
          label: data.discountTypeName,
        },
      });
      setFormData(formatted);
      const imagesFromServer = await loadImagesFromServer(
        data?.imageList || []
      );
      setImages(imagesFromServer);
    } catch (error) {
      toast.error("Failed to fetch product details.");
    } finally {
      setIsLoading(false);
    }
  };

  console.log("images", images);
  const generateSKU = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/GenerateSku/generate-sku`);
      const { sku } = await res.json();
      setFormData((prev) => ({ ...prev, sku }));
    } catch {
      toast.error("Failed to generate SKU");
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
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

      const payload = generateFormData({ fields, images });

      const res = await fetch(`${API_BASE_URL}/SaveProductMasterDetails`, {
        method: "POST",
        body: payload,
      });

      const result = await res.json();

      if (result?.status === 1) {
        toast.success(result.msg || "Product saved successfully");
        handleClear();
        generateSKU();
      } else {
        toast.error(result.msg || "Failed to save product");
      }
    } catch {
      toast.error("Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header d-flex justify-content-between align-items-center">
            <div className="page-title">
              <h4>{product ? "Edit Product" : "Create Product"}</h4>
              <h6>{product ? "Edit existing product" : "Add a new product"}</h6>
            </div>
            <ul className="table-top-head d-flex gap-2">
              <RefreshIcon />
              <CollapesIcon />
              <li>
                <Link to={productlist} className="btn btn-secondary">
                  <ArrowLeft className="me-2" /> Back to Products
                </Link>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="add-product-form">
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
                options={{
                  productType: PRODUCT_TYPES,
                  taxType: TAX_TYPES,
                  discountType: DISCOUNT_TYPES,
                }}
                dropdowns={dropdowns}
                setDropdowns={setDropdowns}
                isLoading={isLoading}
              />
              <ProductImages
                images={images}
                setImages={setImages}
                handleImageChange={(e) =>
                  baseHandleImageChange({
                    e,
                    setImages,
                    existingImages: images,
                  })
                }
                handleRemoveImage={(index) =>
                  handleRemoveImage({ images, setImages, index })
                }
                isLoading={isLoading}
              />
            </div>

            <div className="col-lg-12 d-flex justify-content-end my-4">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={handleClear}
                disabled={isLoading}
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
          </form>
        </div>

        <footer className="footer bg-white border-top p-3 d-sm-flex justify-content-between">
          <p className="mb-0 text-gray-9">
            2014 - 2025 © NXI. All Right Reserved
          </p>
          <p>
            Designed & Developed by{" "}
            <Link to="#" className="text-primary">
              Xcel Technology
            </Link>
          </p>
        </footer>
      </div>

      <AddUnits />
      <AddCategorys />
    </>
  );
};

export default AddProduct;
