import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RotateCcw, ChevronUp, Download } from "react-feather";
import { Table } from "antd";

import TooltipIcon from "../components/TooltipIcon";
import TableColumnImageText from "../components/TableColumnImageText";
import ProductActionButtons from "../components/ProductActionButtons";

import ImageWithBasePath from "../core/img/imagewithbasebath";
import { all_routes } from "../Router/all_routes";
import { setToogleHeader } from "../core/redux/action";
import { toast } from "react-toastify";
import Loader from "../components/loader/loader";
import { API_BASE_URL } from "../environment";

const ProductList = () => {
  const dispatch = useDispatch();
  // const dataSource = useSelector((state) => state.rootReducer.product_list);
  const isHeaderCollapsed = useSelector(
    (state) => state.rootReducer.toggle_header
  );
  const route = all_routes;
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const handleCollapseToggle = (e) => {
    e.preventDefault();
    dispatch(setToogleHeader(!isHeaderCollapsed));
  };

  const handleDelete = () => {};

  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
      sorter: (a, b) => a.sku.length - b.sku.length,
    },
    {
      title: "Product",
      dataIndex: "product",
      render: (_, record) => (
        console.log(record),
        (
          <TableColumnImageText
            imageSrc={record?.productImage}
            text={record?.product}
          />
        )
      ),
      sorter: (a, b) => a.product.length - b.product.length,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      sorter: (a, b) => a.unit.length - b.unit.length,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price.length - b.price.length,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      sorter: (a, b) => a.qty.length - b.qty.length,
    },
    { title: "Created By", dataIndex: "createdby" },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, item) => (
        <ProductActionButtons
          viewLink={route.productdetails}
          editLink={route.editproduct}
          onDelete={() => handleDelete(item)}
          deleteModalId="delete-product-modal"
        />
      ),
      sorter: (a, b) => a.createdby.length - b.createdby.length,
    },
  ];

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/GetProductMasterDetails/6`);
      const result = await response.json();
      console.log("result", result);
      // console.log("product?.ImagePaths[0]", result.data?.imagePaths[0]);

      const tabled = result?.data?.map((product) => ({
        key: product.code,
        sku: product.sku,
        product: product.name,
        category: product.parentGrpName,
        unit: product.unitName,
        price: product.price,
        qty: product.qty,
        createdby: product.users,
        // productImage: product?.imagePaths[0],
        productImage: product?.imagePaths?.[0] ?? "", // ✅ correct image assigned
      }));
      setTableData(tabled);
    } catch (ex) {
      toast.error(ex?.msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Product List</h4>
                <h6>Manage your products</h6>
              </div>
            </div>

            <ul className="table-top-head">
              <li>
                <TooltipIcon tooltip="Pdf">
                  <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="pdf" />
                </TooltipIcon>
              </li>
              <li>
                <TooltipIcon tooltip="Excel">
                  <ImageWithBasePath
                    src="assets/img/icons/excel.svg"
                    alt="excel"
                  />
                </TooltipIcon>
              </li>
              <li>
                <TooltipIcon tooltip="Refresh">
                  <RotateCcw />
                </TooltipIcon>
              </li>
              <li>
                <TooltipIcon tooltip="Collapse">
                  <Link
                    id="collapse-header"
                    className={isHeaderCollapsed ? "active" : ""}
                    onClick={handleCollapseToggle}
                  >
                    <ChevronUp />
                  </Link>
                </TooltipIcon>
              </li>
            </ul>

            <div className="page-btn">
              <Link to={route.addproduct} className="btn btn-primary">
                <i className="ti ti-circle-plus me-1"></i> Add New Product
              </Link>
            </div>
            <div className="page-btn import">
              <Link
                to="#"
                className="btn btn-secondary color"
                data-bs-toggle="modal"
                data-bs-target="#view-notes"
              >
                <Download className="feather me-2" />
                Import Product
              </Link>
            </div>
          </div>

          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-responsive">
                <Table columns={columns} dataSource={tableData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
