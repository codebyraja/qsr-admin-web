import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { toast } from "react-toastify";
import TableColumnImageText from "../components/table/ImageTextCell";
import ProductActionButtons from "../components/table/TableActionButtons";
import Loader from "../components/loader/loader";

import { all_routes } from "../Router/all_routes";
import { setToogleHeader } from "../core/redux/action";
import { API_BASE_URL } from "../environment";
import { useNavigate } from "react-router-dom";
import CommonDeleteModal from "../components/modals/deleteRecord";
import TableHeaderActions from "../components/table/TableHeaderActions";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
      sorter: (a, b) => a.sku.localeCompare(b.sku),
    },
    {
      title: "Product",
      dataIndex: "name",
      render: (_, record) => (
        <TableColumnImageText
          imageSrc={record?.productImage}
          text={record?.name}
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
      render: (_, record) => (
        <ProductActionButtons
          handleViewClick={() => handleViewClick(record)}
          handleEditClick={() => handleEditClick(record)}
          handleDeleteClick={() => handleDeleteClick(record)}
        />
      ),
    },
  ];

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/GetProductMasterDetails/6`);
      const result = await response.json();
      // console.log("result", result);
      const formattedData = result?.data?.map((product, index) => ({
        key: index,
        code: product?.code,
        name: product?.name,
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
    fetchCategories();
  }, []);

  const handleCollapseToggle = (e) => {
    e.preventDefault();
    dispatch(setToogleHeader(!isHeaderCollapsed));
  };

  const handleEditClick = (record) => {
    setSelectedRecord(record);
    navigate(route.addproduct, { state: { product: record } });
  };

  const handleViewClick = (record) => {
    setSelectedRecord(record);
    navigate(route.productdetails, { state: { product: record } });
  };

  const handleDeleteClick = (record) => {
    setShowDeleteModal(true);
    setDeletingItem(record);
  };

  const confirmDelete = async () => {
    if (!deletingItem?.code) return;
    setIsDeleting(true);
    setIsLoading(true);
    try {
      const resp = await fetch(
        `${API_BASE_URL}/DeleteMasterByTypeAndCode/6/${deletingItem?.code}`,
        { method: "DELETE" }
      );
      const res = await resp.json();
      console.log("Delete response:", res);
      if (res.status === 1) {
        toast.success(res.msg || "Product deleted successfully");
        fetchCategories();
      } else {
        toast.error(res.msg || "Failed to delete product");
      }
    } catch {
      toast.error("Error deleting product");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDeletingItem(null);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          <TableHeaderActions
            title="Product List"
            subtitle="Manage your products"
            addButtonLabel="Add New Product"
            onAddClick={() => navigate(route.addproduct)}
            showImport={true}
            exportToPdf={() => {
              toast.info("Export to PDF is not implemented yet");
            }}
            exportToExcel={() => {
              toast.info("Export to Excel is not implemented yet");
            }}
            onRefreshClick={fetchCategories}
            onCollapseToggle={handleCollapseToggle}
            isHeaderCollapsed={isHeaderCollapsed}
          />
          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={tableData}
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
        </div>
        <CommonDeleteModal
          handleShow={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          handleConfirmDelete={confirmDelete}
          title="Delete Product"
          message={`Are you sure you want to delete the product : "${deletingItem?.name}"?`}
          isDeleting={isDeleting}
        />
      </div>
    </>
  );
};

export default ProductList;
