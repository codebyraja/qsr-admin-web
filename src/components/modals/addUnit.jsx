import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../environment";
import Loader from "../loader/loader";

const initialFormState = {
  name: "",
  printName: "",
  status: true,
  masterType: 8,
  users: "admin",
};

const AddUnits = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  // Reset form when modal opens
  useEffect(() => {
    const resetForm = () => setFormData(initialFormState);
    const modal = document.getElementById("add-units");
    modalRef.current = modal;

    modal?.addEventListener("show.bs.modal", resetForm);
    return () => modal?.removeEventListener("show.bs.modal", resetForm);
  }, []);

  // Handle input changes
  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/SaveMasterDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result?.status === 1) {
        setFormData(initialFormState);
        toast.success(result?.msg || "Unit added successfully!");
      } else {
        toast.error(result?.msg || "Something went wrong");
      }
    } catch {
      toast.error("Failed to add unit.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header">
                  <h4 className="modal-title">Add Unit</h4>
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

                    <div className="mb-0 d-flex justify-content-between align-items-center">
                      <label className="form-label mb-0">
                        Status<span className="text-danger ms-1">*</span>
                      </label>
                      <div className="status-toggle modal-status">
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
                      className="btn btn-secondary me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Add Unit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUnits;
