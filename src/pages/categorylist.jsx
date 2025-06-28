// CategoryList.js
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CommonTable from "../components/table/commonTable";
import AddCategoryModal from "../components/modals/addCategory";
import Loader from "../components/loader/loader";
import { API_BASE_URL } from "../environment";
import ProductActionButtons from "../components/table/TableActionButtons";
import TableColumnImageText from "../components/TableColumnImageText";
import CommonDeleteModal from "../components/modals/deleteRecord";
import TableHeaderActions from "../components/table/TableHeaderActions";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../core/redux/action";
import TableToolbar from "../components/table/TableToolbar";

const MASTER_TYPE_CATEGORY = 5;

const CategoryList = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  console.log("CategoryList.js loaded", tableData);

  const columns = [
    {
      title: "Category",
      dataIndex: "name",
      render: (_, record) => (
        <TableColumnImageText
          imageSrc={record?.categoryImg}
          text={record?.name}
        />
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Print Name",
      dataIndex: "printName",
      sorter: (a, b) => a.printName.localeCompare(b.printName),
    },
    {
      title: "Creation By",
      dataIndex: "creationBy",
    },
    {
      title: "Creation Time",
      dataIndex: "creationTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span className="badge table-badge bg-success fw-medium fs-10">
          {text}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <ProductActionButtons
          handleEditClick={() => handleEdit(record)}
          handleDeleteClick={() => handleDeleteClick(record)}
          showView={false}
        />
      ),
    },
  ];

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const resp = await fetch(
        `${API_BASE_URL}/GetMasterDetails/${MASTER_TYPE_CATEGORY}`
      );
      const res = await resp.json();
      if (!Array.isArray(res.data)) throw new Error();

      const formattedData = res.data.map((item) => ({
        id: item.code,
        name: item.name,
        printName: item.printName,
        status: item.isActive ? "Active" : "Inactive",
        creationBy: item.users,
        creationTime: item.creationTime,
        categoryImg: item.imageList?.[0]?.filePath,
      }));

      setTableData(formattedData);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onAddClick = () => {
    setSelectedItem(null);
    setShowFormModal(true);
  };

  const handleEdit = (record) => {
    setSelectedItem(record);
    setShowFormModal(true);
  };

  const handleFormClose = () => {
    setShowFormModal(false);
    setSelectedItem(null);
  };

  const handleFormSuccess = () => {
    fetchCategories();
    handleFormClose();
  };

  const handleDeleteClick = (record) => {
    setDeletingItem(record);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingItem?.id) return;
    setIsDeleting(true);
    setLoading(true);
    try {
      const resp = await fetch(
        `${API_BASE_URL}/DeleteMasterByTypeAndCode/5/${deletingItem?.id}`,
        { method: "DELETE" }
      );
      const res = await resp.json();

      if (res.status === 1) {
        toast.success(res.msg || "Category deleted successfully");
        fetchCategories();
      } else {
        toast.error(res.msg || "Failed to delete category");
      }
    } catch {
      toast.error("Error deleting category");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDeletingItem(null);
      setLoading(false);
    }
  };

  const dispatch = useDispatch();
  const isHeaderCollapsed = useSelector(
    (state) => state.rootReducer.toggle_header
  );

  const handleCollapseToggle = (e) => {
    e.preventDefault();
    dispatch(setToogleHeader(!isHeaderCollapsed));
  };

  return (
    <>
      {loading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          <TableHeaderActions
            title="Category List"
            subtitle="Manage your categories"
            addButtonLabel="Add New Category"
            // addButtonRoute="/add-category"
            onAddClick={onAddClick}
            showImport={false}
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
            <TableToolbar />
            <div className="card-body">
              <div className="table-responsive category-table">
                <CommonTable
                  columns={columns}
                  data={tableData}
                  loading={loading}
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
        </div>

        <AddCategoryModal
          show={showFormModal}
          handleClose={handleFormClose}
          selectedRecord={selectedItem}
          onSuccess={handleFormSuccess}
        />

        <CommonDeleteModal
          handleShow={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          handleConfirmDelete={confirmDelete}
          title="Delete Category"
          message={`Are you sure you want to delete the category : "${deletingItem?.name}"?`}
          isDeleting={isDeleting}
        />
      </div>
    </>
  );
};

export default CategoryList;
