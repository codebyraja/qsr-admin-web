import { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { API_BASE_URL } from "../../environment";
import { toast } from "react-toastify";
import { PlusCircle, X } from "feather-icons-react/build/IconComponents";

const initialFormState = {
  name: "",
  printName: "",
  status: true,
  masterType: 5,
  users: "admin",
  images: [""],
};

const AddCategory = ({ selectedRecord, onSuccess, show, handleClose }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState(null);
  const fileInputRef = useRef(null);
  const isEditMode = Boolean(selectedRecord);

  useEffect(() => {
    if (isEditMode && selectedRecord) {
      setFormData({
        name: selectedRecord.name || "",
        printName: selectedRecord.printName || "",
        status: selectedRecord.status || true,
        masterType: 5,
        users: selectedRecord.users || "admin",
        images: selectedRecord.images || [""],
      });
      setImages(selectedRecord.images?.[0] || null);
    } else {
      setFormData(initialFormState);
      setImages(null);
    }
  }, [selectedRecord]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImages(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append("Name", formData.name);
      fd.append("PrintName", formData.printName);
      fd.append("Status", formData.status);
      fd.append("MasterType", 5);
      fd.append("Users", "admin");
      if (images) fd.append("Images", images);
      if (isEditMode) fd.append("Code", selectedRecord.id);

      const res = await fetch(`${API_BASE_URL}/SaveMasterDetails`, {
        method: "POST",
        body: fd,
      });

      const result = await res.json();
      if (result.status === 1) {
        toast.success(isEditMode ? "Category updated" : "Category added");
        onSuccess();
        handleClose();
      } else {
        toast.error(result.msg || "Operation failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Form onSubmit={handleSubmit}>
        {/* <Modal.Header
          closeButton
          style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        >
          <Modal.Title>
            {isEditMode ? "Edit Category" : "Add Category"}
          </Modal.Title> */}
        <Modal.Header

        // style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        >
          <Modal.Title>
            {isEditMode ? "Edit Category" : "Add Category"}
          </Modal.Title>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClose}
            style={{
              width: "0.85rem",
              height: "0.85rem",
              padding: "0.25rem",
            }}
          ></button>
        </Modal.Header>
        {/* </Modal.Header> */}

        <Modal.Body>
          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label">Avatar</label>
            <div className="profile-pic-upload mb-2">
              <div className="profile-pic position-relative">
                {images ? (
                  <>
                    <img
                      src={
                        typeof images === "string"
                          ? images
                          : URL.createObjectURL(images)
                      }
                      alt="Preview"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "22px",
                        height: "22px",
                        top: "-6px",
                        right: "-6px",
                        padding: 0,
                        zIndex: 2,
                      }}
                      onClick={() => {
                        setImages(null);
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                    >
                      <X size={12} />
                    </button>
                  </>
                ) : (
                  <div className="d-flex align-items-center">
                    <PlusCircle className="me-2" />
                    <span>Profile Photo</span>
                  </div>
                )}
              </div>

              <div className="image-upload mb-0">
                <input
                  type="file"
                  className="form-control"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  required={!isEditMode}
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <Form.Group className="mb-3">
            <Form.Label>
              Category<span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Print Name */}
          <Form.Group className="mb-3">
            <Form.Label>
              Print Name<span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="printName"
              value={formData.printName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Status */}
          <Form.Group className="d-flex justify-content-between align-items-center">
            <Form.Label className="mb-0">
              Status<span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Check
              type="switch"
              id="statusToggle"
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                {isEditMode ? "Updating..." : "Adding..."}
              </>
            ) : isEditMode ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddCategory;
