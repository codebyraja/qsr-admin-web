import React, { useRef, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { X } from "react-feather";
import FormModalFooter from "../common/FormModalFooter";
import LocationSelector from "../common/LocationSelector";
import ImageUpload from "../common/ImageUpload";
import Loader from "../loader/loader";

const AddCustomerModal = ({
  isOpen,
  formData,
  onImageChange,
  onLocationChange,
  onInputChange,
  onClose,
  onSubmit,
  onReset,
  isLoading,
  isEditMode,
}) => {
  return (
    <>
      {isLoading && <Loader />}
      <Modal
        show={isOpen}
        onHide={() => {
          onReset();
          onClose();
        }}
        centered
      >
        <Modal.Header>
          <Modal.Title>Add Customer</Modal.Title>
          <button
            type="button"
            className="btn btn-sm btn-danger remove-image-button"
            aria-label="Close"
            onClick={() => {
              onReset();
              onClose();
            }}
            // style={{ position: "absolute", right: "10px", top: "10px" }}
          >
            <X size={12} />
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <ImageUpload
              onChange={onImageChange}
              initialImage={formData?.image}
            />
            {/* Personal Details */}
            <Row>
              <Col lg={6} className="mb-3">
                <label className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={onInputChange}
                  required
                />
              </Col>
              <Col lg={6} className="mb-3">
                <label className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={onInputChange}
                  required
                />
              </Col>
              <Col lg={12} className="mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={onInputChange}
                  required
                />
              </Col>
              <Col lg={12} className="mb-3">
                <label className="form-label">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={onInputChange}
                  required
                />
              </Col>
              {/* Location Selector */}
              <LocationSelector
                onLocationChange={onLocationChange}
                initialCountry={formData.country}
                initialState={formData.state}
                initialCity={formData.city}
              />
              <Col lg={12} className="mb-3">
                <label className="form-label">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={onInputChange}
                  required
                />
              </Col>
              <Col
                lg={12}
                className="d-flex align-items-center justify-content-between mt-2"
              >
                <label className="form-label  ">
                  <span>Status</span>
                </label>

                <Form.Check
                  type="switch"
                  id="status-switch"
                  name="status"
                  value={formData?.status}
                  label=""
                  onChange={onInputChange}
                  defaultChecked
                />
              </Col>

              <FormModalFooter
                // className="mt-2"
                title="Customer"
                onReset={() => onReset}
                onClose={onClose}
                isLoading={isLoading}
                isEditMode={isEditMode}
              />
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCustomerModal;
