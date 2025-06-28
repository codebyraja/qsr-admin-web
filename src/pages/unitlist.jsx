import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../environment";
import { toast } from "react-toastify";
import Loader from "../components/loader/loader";
import AddUnit from "../components/modals/addUnit";
import CommonDeleteModal from "../components/modals/deleteRecord";
import CommonTable from "../components/table/commonTable";
import TableActionButtons from "../components/table/TableActionButtons";
import TableToolbar from "../components/table/TableToolbar";
import TableHeaderActions from "../components/table/TableHeaderActions";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../core/redux/action";
import CommonFooter from "../core/common/footer/commonFooter";

const UnitList = () => {
  const dispatch = useDispatch();
  const isHeaderCollapsed = useSelector(
    (state) => state.rootReducer.toggle_header
  );
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const columns = [
    {
      title: "Category",
      dataIndex: "name",
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
      sorter: (a, b) => new Date(a.creationBy) - new Date(b.creationBy),
    },
    {
      title: "Creation Time",
      dataIndex: "creationTime",
      sorter: (a, b) => new Date(a.creationTime) - new Date(b.creationTime),
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
      dataIndex: "actions",
      render: (_, record) => (
        <TableActionButtons
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
      const resp = await fetch(`${API_BASE_URL}/GetMasterDetails/8`);
      const res = await resp.json();
      if (!Array.isArray(res.data)) throw new Error();
      // console.log("Fetched categories:", res.data);
      setTableData(
        res.data.map((item) => ({
          id: item.code,
          name: item.name,
          printName: item.printName,
          status: item.isActive ? "Active" : "Inactive",
          creationBy: item.users,
          creationTime: item.creationTime,
        }))
      );
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (record) => {
    setSelectedItem(record);
    setIsModalVisible(true);
  };

  const onAddClick = () => {
    setSelectedItem(null); // for Add mode
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const handleAddedOrUpdated = () => {
    fetchCategories();
    handleModalClose();
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
        `${API_BASE_URL}/DeleteMasterByTypeAndCode/8/${deletingItem?.id}`,
        { method: "DELETE" }
      );
      const res = await resp.json();

      if (res.status === 1) {
        toast.success(res.msg || "Unit deleted successfully");
        fetchCategories();
      } else {
        toast.error(res.msg || "Failed to delete unit");
      }
    } catch {
      toast.error("Error deleting unit");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDeletingItem(null);
      setLoading(false);
    }
  };

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
            title="Unit List"
            subtitle="Manage your units"
            addButtonLabel="Add New Unit"
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
            <CommonTable
              columns={columns}
              data={tableData}
              rowKey={(record) => record.id}
            />
          </div>
        </div>
        <CommonFooter />

        <AddUnit
          selectedRecord={selectedItem}
          onSuccess={handleAddedOrUpdated}
          show={isModalVisible}
          handleClose={handleModalClose}
        />
        <CommonDeleteModal
          handleShow={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          handleConfirmDelete={confirmDelete}
          title="Delete Category"
          message={`Are you sure you want to delete the unit : "${deletingItem?.name}"?`}
          isDeleting={isDeleting}
        />
      </div>
    </>
  );
};

export default UnitList;
