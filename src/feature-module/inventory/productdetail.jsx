import React from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";

const ProductDetail = () => {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product Details</h4>
              <h6>Full details of a product</h6>
            </div>
          </div>
          {/* /add */}
          <div className="row">
            <div className="col-lg-8 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="bar-code-view">
                    <ImageWithBasePath
                      src="assets/img/barcode/barcode1.png"
                      alt="barcode"
                    />
                    <a className="printimg">
                      <ImageWithBasePath
                        src="assets/img/icons/printer.svg"
                        alt="print"
                      />
                    </a>
                  </div>
                  <div className="productdetails">
                    <ul className="product-bar">
                      <li>
                        <h4>Product</h4>
                        <h6>Macbook pro </h6>
                      </li>
                      <li>
                        <h4>Category</h4>
                        <h6>Computers</h6>
                      </li>
                      <li>
                        <h4>Sub Category</h4>
                        <h6>None</h6>
                      </li>
                      <li>
                        <h4>Brand</h4>
                        <h6>None</h6>
                      </li>
                      <li>
                        <h4>Unit</h4>
                        <h6>Piece</h6>
                      </li>
                      <li>
                        <h4>SKU</h4>
                        <h6>PT0001</h6>
                      </li>
                      <li>
                        <h4>Minimum Qty</h4>
                        <h6>5</h6>
                      </li>
                      <li>
                        <h4>Quantity</h4>
                        <h6>50</h6>
                      </li>
                      <li>
                        <h4>Tax</h4>
                        <h6>0.00 %</h6>
                      </li>
                      <li>
                        <h4>Discount Type</h4>
                        <h6>Percentage</h6>
                      </li>
                      <li>
                        <h4>Price</h4>
                        <h6>1500.00</h6>
                      </li>
                      <li>
                        <h4>Status</h4>
                        <h6>Active</h6>
                      </li>
                      <li>
                        <h4>Description</h4>
                        <h6>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industrys standard dummy text ever since the 1500s,
                        </h6>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="slider-product-details">
                    <div className="owl-carousel owl-theme product-slide">
                      <div className="slider-product">
                        <ImageWithBasePath
                          src="assets/img/products/product69.jpg"
                          alt="img"
                        />
                        <h4>macbookpro.jpg</h4>
                        <h6>581kb</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /add */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
