import React from "react";
import { Info, PlusCircle } from "react-feather";
import Select from "react-select";
import { Link } from "react-router-dom";
import TextEditor from "../../feature-module/inventory/texteditor";
import DefaultEditor from "react-simple-wysiwyg";

const ProductInfo = ({
  formData,
  handleChange,
  generateSKU,
  dropdowns,
  setDropdowns,
  unit,
  category,
  isLoading,
  onAddUnit,
  onAddCategory,
}) => {
  return (
    <div className="accordion-item border mb-4">
      <h2 className="accordion-header" id="headingSpacingOne">
        <div
          className="accordion-button collapsed bg-white"
          data-bs-toggle="collapse"
          data-bs-target="#SpacingOne"
          aria-expanded="true"
          aria-controls="SpacingOne"
        >
          <h5 className="d-flex align-items-center">
            <Info className="text-primary me-2" />
            <span>Product Information</span>
          </h5>
        </div>
      </h2>
      <div
        id="SpacingOne"
        className="accordion-collapse collapse show"
        aria-labelledby="headingSpacingOne"
      >
        <div className="accordion-body border-top">
          <div className="row">
            <div className="col-sm-6 col-12">
              <div className="mb-3">
                <label className="form-label">
                  Product Name
                  <span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="productName"
                  value={formData?.productName}
                  onChange={handleChange}
                  placeholder="Enter Product Name"
                  required
                />
              </div>
            </div>
            <div className="col-sm-6 col-12">
              <div className="mb-3">
                <label className="form-label">
                  Slug<span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="productSlug"
                  value={formData?.productSlug}
                  required
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-12">
              <div className="mb-3 list position-relative">
                <label className="form-label">
                  SKU<span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="text"
                  className="form-control list"
                  name="sku"
                  value={formData?.sku}
                  disabled
                />
                <button
                  type="button"
                  className="btn btn-primaryadd"
                  onClick={generateSKU}
                  disabled={isLoading}
                >
                  Generate
                </button>
              </div>
            </div>
            <div className="col-sm-6 col-12">
              <div className="mb-3">
                <div className="add-newplus">
                  <label className="form-label">
                    Unit
                    <span className="text-danger ms-1">*</span>
                  </label>
                  <Link
                    to="#"
                    // data-bs-toggle="modal"
                    // data-bs-target="#add-units"
                    onClick={onAddUnit}
                  >
                    <PlusCircle
                      data-feather="plus-circle"
                      className="plus-down-add"
                    />
                    <span>Add New</span>
                  </Link>
                </div>
                <Select
                  classNamePrefix="react-select"
                  options={unit}
                  placeholder="Choose Unit"
                  name="unit"
                  value={dropdowns?.selectedUnit}
                  onChange={(selectedOption) =>
                    setDropdowns((prev) => ({
                      ...prev,
                      selectedUnit: selectedOption,
                    }))
                  }
                  isLoading={isLoading}
                  isSearchable={true}
                  required
                />
              </div>
            </div>
          </div>
          <div className="addservice-info">
            <div className="row">
              <div className="col-sm-6 col-12">
                <div className="mb-3">
                  <div className="add-newplus">
                    <label className="form-label">
                      Category
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <Link
                      to="#"
                      // data-bs-toggle="modal"
                      // data-bs-target="#add-prod-categorys"
                      onClick={onAddCategory}
                    >
                      <PlusCircle
                        data-feather="plus-circle"
                        className="plus-down-add"
                      />
                      <span>Add New</span>
                    </Link>
                  </div>
                  <Select
                    classNamePrefix="react-select"
                    options={category}
                    placeholder="Choose"
                    name="parentGrp"
                    value={dropdowns?.selectedCategory}
                    onChange={(selectedOption) =>
                      setDropdowns((prev) => ({
                        ...prev,
                        selectedCategory: selectedOption,
                      }))
                    }
                    isLoading={isLoading}
                    isSearchable={true}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="summer-description-box">
              <label className="form-label">Description</label>
              <DefaultEditor
                name="description"
                value={formData?.description}
                className="form-control"
                onChange={handleChange}
                placeholder="Enter Product Description"
              />
              <p className="fs-14 mt-1">Maximum 60 Words</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
