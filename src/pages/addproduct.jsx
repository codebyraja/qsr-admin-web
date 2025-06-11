import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "feather-icons-react/build/IconComponents";
import { toast } from "react-toastify";
import { all_routes } from "../Router/all_routes";
import {
  generateSlug,
  handleImageChange,
  handleRemoveImage,
} from "../utils/common";
import RefreshIcon from "../core/common/tooltip-content/refresh";
import CollapesIcon from "../core/common/tooltip-content/collapes";
import AddUnits from "../components/modals/addUnit";
import AddCategorys from "../components/modals/addCategory";
import { API_BASE_URL } from "../environment";
import Loader from "../components/loader/loader";
import ProductInfo from "../components/product/ProductInfo";
import PricingStock from "../components/product/PricingStock";
import ProductImages from "../components/product/ProductImages";
import {
  DISCOUNT_TYPES as discountType,
  PRODUCT_TYPES as productType,
  TAX_TYPES as taxType,
} from "../constants";

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
  const route = all_routes;

  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [unit, setUnit] = useState([]);
  const [images, setImages] = useState([]);
  const [dropdowns, setDropdowns] = useState({
    selectedCategory: null,
    selectedUnit: null,
    selectedProductType: null,
    selectedTaxType: null,
    selectedDiscountType: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "productName" && { productSlug: generateSlug(value) }),
    }));
  };

  const handleDropdownChange = (name, selectedOption) => {
    setDropdowns((prev) => ({ ...prev, [name]: selectedOption }));
    setFormData((prev) => ({ ...prev, [name]: selectedOption?.value || "" }));
  };

  const getMasterList = async (type) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/GetMasterList/${type}`);
      const result = await res.json();
      if (type === 5) setCategory(result?.data);
      if (type === 8) setUnit(result?.data);
    } catch {
      toast.error("Failed to fetch master list");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSKU = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/GenerateSku/generate-sku`);
      const { sku } = await res.json();
      setFormData((prev) => ({ ...prev, sku }));
    } catch {
      console.error("Failed to generate SKU");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFormData(defaultFormData);
    setDropdowns({
      selectedCategory: null,
      selectedUnit: null,
      selectedProductType: null,
      selectedTaxType: null,
      selectedDiscountType: null,
    });
    setImages([]);
  };

  const appendFormData = () => {
    const fd = new FormData();
    const getLabel = (key) => dropdowns[key]?.label || "";
    const getValue = (key) => dropdowns[key]?.value || 0;

    const entries = {
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

    Object.entries(entries).forEach(([key, val]) => {
      fd.append(key, val ?? "");
    });

    images.forEach((img) => {
      fd.append("images", img.file);
    });

    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const formDatadt = appendFormData();
      const response = await fetch(`${API_BASE_URL}/SaveMasterDetails`, {
        method: "POST",
        body: formDatadt,
      });

      const result = await response.json();
      console.log("result", result);
      result?.status === 1 ? handleClear() : null;
      toast[result?.status === 1 ? "success" : "error"](
        generateSKU(),
        result?.msg || "Something went wrong"
      );
    } catch (error) {
      toast.error("Failed to add product.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMasterList(5); // Category
    getMasterList(8); // Unit
    generateSKU();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Create Product</h4>
                <h6>Create new product</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
              <CollapesIcon />
              <li>
                <div className="page-btn">
                  <Link to={route.productlist} className="btn btn-secondary">
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
                handleRemoveImage={(i) =>
                  handleRemoveImage({ images, setImages, index: i })
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
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  Add Product
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
