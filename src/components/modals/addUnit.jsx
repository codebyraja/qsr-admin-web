import { useEffect, useRef, useState } from "react";
import ApiService from "../../services/api";
import { toast } from "react-toastify";

const AddUnits = () => {
  const initialFormState = {
    name: "",
    printName: "",
    status: true,
    masterType: 8,
    users: "admin",
  };

  const [formData, setFormData] = useState(initialFormState);
  const modalRef = useRef(null);

  useEffect(() => {
    const handler = () => {
      setFormData(initialFormState);
    };

    const modal = document.getElementById("add-units");
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ApiService.post("/SaveMasterDetails", formData);

      console.log("Response from server:", response);
      // If using Axios, response.data would have the SQL result
      if (response?.status === 1) {
        toast.success(response.msg || "Unit added successfully!");
        setFormData(initialFormState);
      } else {
        toast.error(response?.msg || "Failed to add unit.");
      }
    } catch (error) {
      toast.error("Server error while adding unit.");
    }
  };

  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header">
                <div className="page-title">
                  <h4>Add Unit</h4>
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
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">
                      Unit<span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Print Name<span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="printName"
                      className="form-control"
                      value={formData.printName}
                      onChange={handleChange}
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
                        id="unit-status"
                        name="status"
                        className="check"
                        checked={formData.status}
                        onChange={handleChange}
                      />
                      <label htmlFor="unit-status" className="checktoggle" />
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
                    className="btn btn-primary fs-13 fw-medium p-2 px-3"
                  >
                    Add Unit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUnits;
