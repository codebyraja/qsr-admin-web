import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CommonTableHeader from "../core/common/table/tableHeader";
import TableTopFilter from "../core/common/table/tableTopFilter";
import CommonTable from "../core/common/table/commonTable";
import AddCategorys from "../components/modals/addCategory";
import Loader from "../components/loader/loader";
import { API_BASE_URL } from "../environment";
import ProductActionButtons from "../components/ProductActionButtons";
import TableColumnImageText from "../components/TableColumnImageText";

const CategoryList = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // used for edit or add
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      const resp = await fetch(`${API_BASE_URL}/GetMasterDetails/5`);
      const res = await resp.json();
      if (!Array.isArray(res.data)) throw new Error();

      setTableData(
        res.data.map((item) => ({
          id: item.code,
          name: item.name,
          printName: item.printName,
          status: item.isActive,
          creationBy: item.users,
          creationTime: item.creationTime,
          categoryImg: item.imageList?.[0]?.filePath,
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
    // Add your delete modal handling logic here
    toast.warn(`Delete logic not implemented for: ${record.name}`);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          <CommonTableHeader title="Category" onAddClick={handleAdd} />
          <div className="card table-list-card">
            <TableTopFilter />
            <CommonTable
              columns={columns}
              data={tableData}
              loading={loading}
              rowKey={(record) => record.id}
            />
          </div>
        </div>

        {/* React-Bootstrap style modal control */}
        <AddCategorys
          show={isModalVisible}
          handleClose={handleModalClose}
          selectedRecord={selectedItem}
          onSuccess={handleAddedOrUpdated}
        />
      </div>
    </>
  );
};

export default CategoryList;
