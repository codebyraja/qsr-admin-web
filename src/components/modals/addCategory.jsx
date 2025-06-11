import { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../../environment";
import { toast } from "react-toastify";
import ApiService from "../../services/api";

const AddCategory = () => {
  const initialFormState = {
    name: "",
    printName: "",
    status: true,
    masterType: 5,
    users: "admin", // assuming this is required
  };

  const [formData, setFormData] = useState(initialFormState);
  const modalRef = useRef(null);

  useEffect(() => {
    const handler = () => {
      setFormData({
        name: "",
        printName: "",
        status: true,
      });
    };

    const modal = document.getElementById("add-categorys");
    modalRef.current = modal;
    if (modal) {
      modal.addEventListener("show.bs.modal", handler);
    }
    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener("show.bs.modal", handler);
      }
    };
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const resp = await fetch(`${API_BASE_URL}/SaveMasterDetails`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!resp.ok) throw new Error("Failed to save category");

  //     const data = await resp.json();
  //     console.log("Data received:", data);

  //     setFormData(initialFormState);
  //     toast.success("Category added successfully!");
  //   } catch (error) {
  //     console.error("Error adding category:", error);
  //     toast.error("Failed to add category. Please try again.");
  //   }
  // };

  // 🔄 Fetch categories on component mount
  useEffect(() => {
    // fetchCategories();
  }, []);

  // const fetchCategories = async () => {
  //   try {
  //     const data = await ApiService.get("/SaveMasterDetails");
  //     setFormData(data);
  //   } catch (error) {
  //     toast.error("Failed to load categories.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await ApiService.post("/SaveMasterDetails", {
        ...formData,
        masterType: 1, // assuming this is required
        users: "admin", // assuming this is required
      });

      toast.success("Category added successfully!");
      setFormData(initialFormState);
      // fetchCategories(); // refresh list
    } catch (error) {
      toast.error("Failed to add category.");
    }
  };

  return (
    <div
      className="modal fade"
      id="add-categorys"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="addCategorysLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            {/* <div className="modal-content"> */}
            <div className="modal-header">
              <div className="page-title">
                <h4>Add Category</h4>
              </div>
              <button
                type="button"
                className="close bg-danger text-white fs-16"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <form action="#" onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    Category<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Print Name<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="printName"
                    value={formData.printName}
                    onChange={(e) =>
                      setFormData({ ...formData, printName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-0">
                  <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                    <span className="status-label">
                      Status<span className="text-danger ms-1">*</span>
                    </span>
                    <input
                      type="checkbox"
                      id="user2"
                      className="check"
                      checked={formData.status}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          status: !prev.status,
                        }))
                      }
                    />
                    <label htmlFor="user2" className="checktoggle" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  // data-bs-dismiss="modal"
                  className="btn btn-primary fs-13 fw-medium p-2 px-3"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
