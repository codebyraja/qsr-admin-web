import React, { useEffect, useState } from "react";
import CommonTableHeader from "../core/common/table/tableHeader";
import TableTopFilter from "../core/common/table/tableTopFilter";
import CommonTable from "../core/common/table/commonTable";
import CommonFooter from "../core/common/footer/commonFooter";
import { API_BASE_URL } from "../environment";
import { toast } from "react-toastify";
import Loader from "../components/loader/loader";
import ProductActionButtons from "../components/ProductActionButtons";
import AddUnit from "../components/modals/addUnit";
import CommonDeleteModal from "../components/CommonDeleteModal";

const UnitList = () => {
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
      title: "Actions",
      dataIndex: "actions",
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
      const resp = await fetch(`${API_BASE_URL}/GetMasterDetails/8`);
      const res = await resp.json();
      if (!Array.isArray(res.data)) throw new Error();
      console.log("Fetched categories:", res.data);
      setTableData(
        res.data.map((item) => ({
          id: item.code,
          name: item.name,
          printName: item.printName,
          status: item.isActive,
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

  const handleAdd = () => {
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
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          <CommonTableHeader
            title="Unit"
            modalId="add-units"
            onAddClick={() => handleAdd()}
          />
          <div className="card table-list-card">
            <TableTopFilter />
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
