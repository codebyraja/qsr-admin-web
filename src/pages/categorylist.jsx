import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CommonTableHeader from "../core/common/table/tableHeader";
import TableTopFilter from "../core/common/table/tableTopFilter";
import CommonTable from "../core/common/table/commonTable";
import CommonFooter from "../core/common/footer/commonFooter";
import AddCategorys from "../components/modals/addCategory";
import CommonDeleteModal from "../core/common/modal/commonDeleteModal";
import { Table } from "antd";
import { generateColumns } from "../utils/generateColumns";
import { categoryColumn } from "../utils/tableColumns";
import ApiService from "../services/api";
import Loader from "../components/loader/loader";
import { API_BASE_URL } from "../environment";
import { Link } from "react-router-dom";
import Datatable from "../core/pagination/datatable";

const CategoryList = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Category",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Print Name",
      dataIndex: "printName", // ✅ corrected
      sorter: (a, b) => a.printName.length - b.printName.length,
    },
    {
      title: "Created On",
      dataIndex: "createdOn", // ✅ corrected
      sorter: (a, b) => a.createdOn.length - b.createdOn.length,
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
      title: "Actions",
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

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE_URL}/GetMasterDetails/5`);
      const result = await resp.json();
      console.log("Parsed JSON result: ", result);

      if (!result.data || !Array.isArray(result.data)) {
        throw new Error("API returned invalid or empty data.");
      }

      const categories = result.data.map((item) => ({
        id: item.code,
        name: item.name || "Unnamed",
        printName: item.printName ?? "N/A",
        createdOn: item.createdOn ?? "N/A",
        status: item.isActive ? "Active" : "Inactive",
      }));

      setTableData(categories);
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
          <CommonTableHeader title="Category" modalId="add-categorys" />
          <div className="card table-list-card">
            <TableTopFilter />
            <CommonTable
              columns={generateColumns(categoryColumn)}
              data={tableData}
              loading={loading}
            />
          </div>
        </div>
        {/* <CommonFooter /> */}
        <AddCategorys />
        {/* <CommonDeleteModal /> */}
      </div>
    </>
  );
};

export default CategoryList;
