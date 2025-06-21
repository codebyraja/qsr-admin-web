import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { RotateCcw, ChevronUp, Download } from "react-feather";
import { Table } from "antd";
import { toast } from "react-toastify";

import TooltipIcon from "../components/TooltipIcon";
import TableColumnImageText from "../components/TableColumnImageText";
import ProductActionButtons from "../components/ProductActionButtons";
import ImageWithBasePath from "../core/img/imagewithbasebath";
import Loader from "../components/loader/loader";

import { all_routes } from "../Router/all_routes";
import { setToogleHeader } from "../core/redux/action";
import { API_BASE_URL } from "../environment";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const isHeaderCollapsed = useSelector(
    (state) => state.rootReducer.toggle_header
  );

  const route = all_routes;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleCollapseToggle = (e) => {
    e.preventDefault();
    dispatch(setToogleHeader(!isHeaderCollapsed));
  };

  const handleEditClick = (record) => {
    // setMode("modify");
    setSelectedRecord(record);
    navigate(route.addproduct, { state: { product: record } });
  };

  const handleViewClick = (record) => {
    setSelectedRecord(record);
    navigate(route.productdetails, { state: { product: record } });
  };

  const handleDeleteClick = (record) => {
    // setMode("delete");
    setSelectedRecord(record);
    // Open your delete confirmation modal here
  };

  const handleDelete = () => {
    // actual delete logic goes here
  };

  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
      sorter: (a, b) => a.sku.localeCompare(b.sku),
    },
    {
      title: "Product",
      dataIndex: "product",
      render: (_, record) => (
        <TableColumnImageText
          imageSrc={record?.productImage}
          text={record?.product}
        />
      ),
      sorter: (a, b) => a.product.localeCompare(b.product),
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      sorter: (a, b) => a.unit.localeCompare(b.unit),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      sorter: (a, b) => a.qty - b.qty,
    },
    {
      title: "Creation By",
      dataIndex: "createdby",
    },
    {
      title: "Creation Time",
      dataIndex: "creationTime",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, item) => (
        <ProductActionButtons
          handleViewClick={() => handleViewClick(item)}
          handleEditClick={() => handleEditClick(item)}
          handleDeleteClick={() => handleDeleteClick(item)}
          deleteModalId="delete-product-modal"
        />
      ),
    },
  ];

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/GetProductMasterDetails/6`);
      const result = await response.json();
      // console.log("result", result);
      const formattedData = result?.data?.map((product, index) => ({
        key: index,
        code: product?.code,
        product: product?.name,
        sku: product?.sku,
        category: product?.parentGrpName,
        unit: product?.unitName,
        price: product?.price,
        qty: product?.qty,
        createdby: product?.users,
        creationTime: product?.creationTime,
        productImage: product?.imageList[0]?.filePath ?? "",
      }));
      setTableData(formattedData || []);
    } catch (ex) {
      toast.error(ex?.message || "Failed to fetch product data");
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
