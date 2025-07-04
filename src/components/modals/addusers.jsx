import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { PlusCircle, X } from "feather-icons-react/build/IconComponents";
import { API_BASE_URL } from "../../environment";
import Select from "react-select";

// Optional loader component, can replace with your own or remove
const Loader = () => (
  <div className="text-center py-3">
    <Spinner animation="border" />
  </div>
);

const AddUsers = ({ record, onSubmitSuccess, showModal, onClose }) => {
  const [formData, setFormData] = useState({
    code: 0,
    name: "",
    mobile: "",
    email: "",
    username: "",
    pwd: "",
    role: 0,
    userType: 0,
    remark: "",
    base64: "",
    status: 0,
    users: "",
  });

  const [passwords, setPasswords] = useState({
    password: "",
    confirm: "",
    error: "",
  });

  console.log("AddUsers component initialized with record:", passwords);
  const isEditMode = Boolean(record);
  const [showPwd, setShowPwd] = useState(false);
  // const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: 1, label: "Super Admin" },
    { value: 2, label: "Admin" },
    { value: 3, label: "User" },
  ];
  useEffect(() => {
    if (showModal) {
      if (isEditMode && record) {
        GetUserById(record.userId);
      } else {
        resetForm();
      }
    }
    // eslint-disable-next-line
  }, [isEditMode, showModal, record]);

  const resetForm = () => {
    setFormData({
      code: 0,
      name: "",
      mobile: "",
      email: "",
      username: "",
      pwd: "",
      role: 0,
      userType: 0,
      remark: "",
      base64: "",
      status: 0,
      users: "",
    });
    setPasswords({ password: "", confirm: "", error: "" });
    setShowPwd(false);
  };

  const GetUserById = async (userId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/GetUserById/${userId}`);
      const result = await response.json();
      const data = result?.data;

      if (data) {
        setFormData({
          code: data.code || data.userId,
          name: data.name || data.username,
          mobile: data.mobile || data.mobileNo,
          email: data.email || data.emailId,
          username: data.username,
          pwd: data.pwd,
          role: data.role || data.roleId || 0,
          userType: data.userType || "",
          remark: data.remark || data.desc || "",
          base64: data.base64 || data.image || "",
          status: data.status || (data.active === 0 ? 0 : 1),
          users: data.users || "",
        });

        setPasswords({
          password: data.pwd || "",
          confirm: data.pwd || "",
          error: "",
        });
      }
    } catch (err) {
      toast.error("Error loading user: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const validatePasswords = () => {
    if (passwords.password !== passwords.confirm) {
      setPasswords((prev) => ({
        ...prev,
        error: "Passwords do not match",
      }));
      return false;
    }

    if (passwords.password.length < 6) {
      setPasswords((prev) => ({
        ...prev,
        error: "Password must be at least 6 characters long",
      }));
      return false;
    }
    setPasswords((prev) => ({ ...prev, error: "" }));
    return true;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, base64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({ ...prev, base64: "" }));
    const fileInput = document.getElementById("upload-avatar");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    // Validate required fields
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.mobile.trim()) {
      toast.error("Mobile number is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!formData.username.trim()) {
      toast.error("Username is required");
      return;
    }
    setIsLoading(true);

    try {
      const submitData = {
        code: formData.code,
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        username: formData.username,
        pwd: passwords.password,
        role: formData.role,
        userType: formData.userType,
        remark: formData.remark,
        base64: formData.base64,
        status: formData.status,
        users: formData.users,
      };

      console.log("Form data before submission:", submitData);
      // Log the data being submitted
      if (isEditMode) {
        submitData.userId = formData.userId; // Include userId for updates
      } else {
        submitData.userId = 0; // Set userId to 0 for new users
      }
      const response = await fetch(`${API_BASE_URL}/SaveUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      if (result.status === 1) {
        toast.success(result.msg);
        resetForm();
        onSubmitSuccess();
        onClose();
      } else {
        toast.error(result.msg || "Failed to save user");
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={onClose}
      size="lg"
      centered
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>{record ? "Add User" : "Edit User"}</Modal.Title>
        <button
          type="button"
          className="modal-close-button"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={12} />
        </button>
      </Modal.Header>

      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="mb-3">
            <Col md={12} className="text-center">
              {formData.base64 ? (
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img
                    src={formData.base64}
                    alt="Avatar"
                    className="rounded-circle"
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                  <Button
                    variant="danger"
                    className="small-remove-btn"
                    onClick={handleImageRemove}
                  >
                    <X size={14} />
                  </Button>
                </div>
              ) : (
                <Form.Label
                  htmlFor="upload-avatar"
                  className="btn btn-outline-primary"
                >
                  <PlusCircle className="me-2" /> Upload Avatar
                </Form.Label>
              )}
              <Form.Control
                id="upload-avatar"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col className="mb-3" md={6}>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col className="mb-3" md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col className="mb-3" md={6}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="mb-3" md={6}>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPwd ? "text" : "password"}
                    name="password"
                    value={passwords.password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPwd(!showPwd)}
                  >
                    {showPwd ? "Hide" : "Show"}
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col className="mb-3" md={6}>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPwd ? "text" : "password"}
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                    isInvalid={!!passwords.error}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPwd(!showPwd)}
                  >
                    {showPwd ? "Hide" : "Show"}
                  </Button>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {passwords.error}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="mb-3" md={6}>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Select
                  classNamePrefix="react-select"
                  options={roleOptions}
                  placeholder="Choose Role"
                  name="role"
                  // value={dropdowns?.selectedUnit}
                  // onChange={(selectedOption) =>
                  //   setDropdowns((prev) => ({
                  //     ...prev,
                  //     selectedUnit: selectedOption,
                  //   }))
                  // }
                  isLoading={isLoading}
                  isSearchable={true}
                  required
                />
              </Form.Group>
            </Col>

            <Col className="mb-3" md={12}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  rows={3}
                />
              </Form.Group>
            </Col>

            {/* Status */}
            <Col md={3}>
              <Form.Group className="d-flex justify-content-between align-items-center">
                <Form.Label className="mb-0">
                  Status<span className="text-danger ms-1">*</span>
                </Form.Label>
                <Form.Check
                  type="switch"
                  id="statusToggle"
                  name="status"
                  checked={!record ? 1 : formData?.status}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={onClose}>
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

export default AddUsers;
