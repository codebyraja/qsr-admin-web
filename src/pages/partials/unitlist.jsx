import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/loader/loader";
import AddUnit from "../../components/modals/addUnit";
import CommonDeleteModal from "../../components/modals/deleteRecord";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import CommonFooter from "../../core/common/footer/commonFooter";
import { exportToExcel } from "../../utils/exportToExcel";
import { API_URL } from "../../environment";
import DataTableHeader from "../../components/table/DataTableHeader";
import DataTable from "../../components/common/DataTable";
import RowActionButtons from "../../components/table/RowActionButtons";
import { handleCollapseToggle } from "../../utils/common";

const UnitList = () => {
  const dispatch = useDispatch();
  const isHeaderCollapsed = useSelector(
    (state) => state.rootReducer.toggle_header
  );

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const columns = [
    {
      title: "Unit",
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
        <span
          className={`badge table-badge ${
            text == "Active" ? `bg-success` : `bg-danger`
          } fw-medium fs-10`}
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <RowActionButtons
          onEdit={() => handleEditRow(record)}
          onDelete={() => handleDeleteRow(record)}
          canView={false}
        />
      ),
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${API_URL}/GetMasterDetails/8`);
      const json = await resp.json();
      if (json.status !== 1) toast.error(json.msg || "Failed to load units");

      if (!Array.isArray(json.data)) throw new Error();
      // console.log("Fetched categories:", res.data);
      setTableData(
        json?.data?.map((item) => ({
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
    fetchData();
  }, []);

  const handleEditRow = (record) => {
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
    fetchData();
    handleModalClose();
  };

  const handleDeleteRow = (record) => {
    setSelectedItem(record);
    setDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem?.id) return;
    setIsDeleting(true);
    setLoading(true);
    try {
      const resp = await fetch(
        `${API_URL}/DeleteMasterByTypeAndCode?tranType=1&masterType=8&code=${selectedItem?.id}`,
        { method: "DELETE" }
      );
      const res = await resp.json();

      if (res.status === 1) {
        toast.success(res.msg || "Unit deleted successfully");
        fetchData();
      } else {
        toast.error(res.msg || "Failed to delete unit");
      }
    } catch {
      toast.error("Error deleting unit");
    } finally {
      setIsDeleting(false);
      setDeleteModal(false);
      setSelectedItem(null);
      setLoading(false);
    }
  };

  const handleExportToExcel = () => {
    // 1️⃣ तय कीजिये कौन‑कौन से कॉलम एक्सपोर्ट करने हैं
    const headers = [
      // { key: "Id", title: "ID" },
      // { key: "Name", title: "Product Name" },
      // { key: "Qty", title: "Quantity" },
      // { key: "Price", title: "Unit Price" },
    ];

    // eslint-disable-next-line no-irregular-whitespace
    // 2️⃣ Title row में company / report date वग़ैरह add करना हो तो rows को पहले mutate कर सकते हैं
    exportToExcel(
      tableData,
      `${"xyz"}_Stock_${new Date().toISOString().slice(0, 10)}`,
      headers,
      "Stock Data",
      () => toast.success("Excel downloaded 🙂")
    );
  };

  return (
    <>
      {loading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          <DataTableHeader
            title="Unit List"
            subtitle="Manage your units"
            addButtonLabel="Add New Unit"
            onNavigate={onAddClick}
            showImport={false}
            onExportPdf={() => {
              toast.info("Export to PDF is not implemented yet");
            }}
            onExportExcel={() => handleExportToExcel(tableData)}
            onRefresh={fetchData}
            onToggleCollapse={(e) =>
              handleCollapseToggle(
                e,
                dispatch,
                setToogleHeader,
                isHeaderCollapsed
              )
            }
            isHeaderCollapsed={isHeaderCollapsed}
          />
          <DataTable columns={columns} dataSource={tableData} />
        </div>
        <CommonFooter />

        <AddUnit
          selectedRecord={selectedItem}
          onSuccess={handleAddedOrUpdated}
          show={isModalVisible}
          handleClose={handleModalClose}
        />
        <CommonDeleteModal
          onShow={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Category"
          message={`Are you sure you want to delete the unit : "${selectedItem?.name}"?`}
          isDeleting={isDeleting}
        />
      </div>
    </>
  );
};

export default UnitList;
