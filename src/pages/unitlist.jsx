import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CommonTableHeader from "../core/common/table/tableHeader";
import TableTopFilter from "../core/common/table/tableTopFilter";
import CommonTable from "../core/common/table/commonTable";
import CommonFooter from "../core/common/footer/commonFooter";
import CommonDeleteModal from "../core/common/modal/commonDeleteModal";
import AddUnits from "../components/modals/addUnit";
import { API_BASE_URL } from "../environment";
import { toast } from "react-toastify";
import { generateColumns } from "../utils/generateColumns";
import { unitColumn } from "../utils/tableColumns";
import Loader from "../components/loader/loader";

const UnitList = () => {
  const dataSource = useSelector(
    (state) => state.rootReducer.categotylist_data
  );

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Category Slug",
      dataIndex: "categoryslug",
      sorter: (a, b) => a.categoryslug.length - b.categoryslug.length,
    },
    {
      title: "Created On",
      dataIndex: "createdon",
      sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span className="badge bg-success fw-medium fs-10">{text}</span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-category"
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              className="p-2"
              to="#"
            >
              <i data-feather="trash-2" className="feather-trash-2"></i>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const openModal = () => {
    // Logic to open modal can be added here
    // For example, you can dispatch an action or set a state to trigger the modal
  };
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // const columns = [
  //   {
  //     title: "Category",
  //     dataIndex: "name",
  //     sorter: (a, b) => a.name.length - b.name.length,
  //   },
  //   {
  //     title: "Print Name",
  //     dataIndex: "printName", // ✅ corrected
  //     sorter: (a, b) => a.printName.length - b.printName.length,
  //   },
  //   {
  //     title: "Created On",
  //     dataIndex: "createdOn", // ✅ corrected
  //     sorter: (a, b) => a.createdOn.length - b.createdOn.length,
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     render: (text) => (
  //       <span className="badge bg-success fw-medium fs-10">{text}</span>
  //     ),
  //     sorter: (a, b) => a.status.length - b.status.length,
  //   },
  //   {
  //     title: "Actions",
  //     dataIndex: "actions",
  //     key: "actions",
  //     render: () => (
  //       <div className="action-table-data">
  //         <div className="edit-delete-action">
  //           <Link
  //             className="me-2 p-2"
  //             to="#"
  //             data-bs-toggle="modal"
  //             data-bs-target="#edit-category"
  //           >
  //             <i data-feather="edit" className="feather-edit"></i>
  //           </Link>
  //           <Link
  //             data-bs-toggle="modal"
  //             data-bs-target="#delete-modal"
  //             className="p-2"
  //             to="#"
  //           >
  //             <i data-feather="trash-2" className="feather-trash-2"></i>
  //           </Link>
  //         </div>
  //       </div>
  //     ),
  //   },
  // ];

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE_URL}/GetMasterDetails/8`); // NOTE: http not https
      const result = await resp.json();
      console.log("Parsed JSON result: ", result);

      if (!result.data || !Array.isArray(result.data)) {
        throw new Error("API returned invalid or empty data.");
      }

      const unit = result.data.map((item) => ({
        id: item.code,
        name: item.name || "Unnamed",
        printName: item.printName ?? "N/A",
        createdOn: item.createdOn ?? "N/A",
        status: item.isActive ? "Active" : "Inactive",
      }));

      setTableData(unit);
    } catch (error) {
      toast.error("Failed to load categories.");
    } finally {
      setLoading(false);
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
            onAdd={() => openModal()}
          />
          <div className="card table-list-card">
            <TableTopFilter />
            <CommonTable
              columns={generateColumns(unitColumn)}
              data={tableData}
            />
          </div>
        </div>
        <CommonFooter />
      </div>
      <AddUnits />
      <CommonDeleteModal />
    </>
  );
};

export default UnitList;
