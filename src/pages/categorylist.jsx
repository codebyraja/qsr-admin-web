import { useSelector } from "react-redux";
import CommonTableHeader from "../core/common/table/tableHeader";
import TableTopFilter from "../core/common/table/tableTopFilter";
import CommonTable from "../core/common/table/commonTable";
import CommonFooter from "../core/common/footer/commonFooter";
import AddCategorys from "../components/modals/addCategory";
import CommonDeleteModal from "../core/common/modal/commonDeleteModal";
import { generateColumns } from "../utils/generateColumns";
import { categoryColumn } from "../utils/tableColumns";
import { useEffect, useState } from "react";
import ApiService from "../services/api";
import { toast } from "react-toastify";

const CategoryList = () => {
  const [data, setData] = useState([]);
  const dataSource = useSelector(
    (state) => state.rootReducer.categotylist_data
  );
  console.log("Data source:", data);
  const openModal = () => {
    // Logic to open modal can be added here
    // For example, you can dispatch an action or set a state to trigger the modal
  };
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    try {
      const resp = await ApiService.get("/GetMasterDetails?masterType=1");
      console.log("Data received:", resp);
      if (!resp || resp.length === 0) {
        toast.info("No categories found.");
      }

      data.forEach((item, index) => {
        item.key = index; // Assigning a unique key for each item
      });

      setData(resp.data || []); // Set the data from the response
      console.log("Categories loaded successfully:", resp.data);
      toast.success("Categories loaded successfully!");
      // If you need to set a unique key for each item, you can map through the data

      // setData(
      //   data.map((item) => ({
      //     ...item,
      //     key: item.id, // Assuming each item has a unique 'id' field
      //   }))
      // );
    } catch (error) {
      toast.error("Failed to load categories.");
    }
  };
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <CommonTableHeader
            title="Category"
            modalId="add-categorys"
            onAdd={() => openModal()}
          />
          <div className="card table-list-card">
            <TableTopFilter />
            <CommonTable
              columns={generateColumns(categoryColumn)}
              data={data}
            />
          </div>
        </div>
        <CommonFooter />
      </div>
      <AddCategorys />
      <CommonDeleteModal />
    </div>
  );
};

export default CategoryList;
