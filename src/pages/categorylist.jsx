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
import { Link, useNavigate } from "react-router-dom";
import Datatable from "../core/pagination/datatable";
import ProductActionButtons from "../components/ProductActionButtons";
import { all_routes } from "../Router/all_routes";

const CategoryList = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const navigate = useNavigate();
  const route = all_routes;

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
      render: (_, item) => (
        <ProductActionButtons
          handleEditClick={() => handleEditClick(item)}
          handleDeleteClick={() => handleDeleteClick(item)}
          deleteModalId="delete-product-modal"
          showView={false}
        />
      ),
    },
    {
      type: "actions",
      actions: ["edit", "delete"],
    },
  ];

  const handleEditClick = (record) => {
    // setMode("modify");
    setSelectedRecord(record);
    navigate(route.addproduct, { state: { product: record } });
  };

  const handleDeleteClick = (record) => {
    // setMode("delete");
    setSelectedRecord(record);
    // Open your delete confirmation modal here
  };

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
        creationBy: item.users ?? "N/A",
        creationTime: item.creationTime ?? "N/A",
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
            <CommonTable columns={columns} data={tableData} loading={loading} />
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
