import { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../../environment";
import { toast } from "react-toastify";
import { PlusCircle, X } from "feather-icons-react/build/IconComponents";
import { Link } from "react-router-dom";

const initialFormState = {
  name: "",
  printName: "",
  status: true,
  masterType: 5,
  users: "admin",
  imges: [""],
};

const AddCategory = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const resetForm = () => setFormData(initialFormState);
    const modal = document.getElementById("add-categorys");

    if (modal) {
      modalRef.current = modal;
      modal.addEventListener("show.bs.modal", resetForm);
    }

    return () => {
      modalRef.current?.removeEventListener("show.bs.modal", resetForm);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
    // const reader = new FileReader();
    // reader.onload = () => setImage(reader.result);
    // reader.readAsDataURL(file);
  };
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
        toast.success(result?.msg || "Category added successfully!");
      } else {
        toast.error(result?.msg || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to add category.");
    } finally {
      setIsLoading(false);
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
          <div className="modal-header">
            <h4 className="modal-title">Add Category</h4>
            <button
              type="button"
              className="close bg-danger text-white fs-16"
              data-bs-dismiss="modal"
            >
              <span>×</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* <div className="mb-3">
                <div className="image-upload">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isLoading}
                    className="form-control"
                  />
                  <div className="image-uploads">
                    <PlusCircle className="plus-down-add me-0" />
                    <h4>Add Images</h4>
                  </div>
                </div>
                {image && (
                  <div className="d-flex flex-wrap gap-3">
                    <div className="phone-img position-relative">
                      <img
                        // src={URL.createObjectURL(image)}
                        alt={`preview-`}
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                        }}
                      />
                      <Link
                        to="#"
                        className="position-absolute" // top-0 end-0
                        // onClick={() => handleRemoveImage(index)}
                      >
                        <X />
                      </Link>
                    </div>
                  </div>
                )}
              </div> */}
              <div className="col-lg-12">
                <div className="new-employee-field">
                  <span>Avatar</span>
                  <div className="profile-pic-upload mb-2">
                    <div className="profile-pic">
                      {image ? (
                        <>
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                            }}
                            className="img-thumbnail"
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-danger position-absolute top-0 end-0"
                            onClick={() => setImage(null)}
                            style={{ lineHeight: 1, padding: "2px 6px" }}
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <div className="d-flex align-items-center">
                          <PlusCircle className="me-2" />
                          <span>Profile Photo</span>
                        </div>
                      )}
                    </div>
                    <div className="input-blocks mb-0">
                      <div className="image-upload mb-0">
                        <input className="file" type="file" />
                        <div className="image-uploads">
                          <h4>Change Image</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Category<span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
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
                  className="form-control"
                  name="printName"
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
                    id="statusToggle"
                    className="check"
                    name="status"
                    checked={formData.status}
                    onChange={handleChange}
                  />
                  <label htmlFor="statusToggle" className="checktoggle" />
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
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
