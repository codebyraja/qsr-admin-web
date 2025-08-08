import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import SelectInput from "./partials/SelectInput";
import TextInput from "./partials/TextInput";
import DateInput from "./partials/DateInput";
import ProductTable from "./partials/ProductTable";
import TotalSummary from "./partials/TotalSummary";
import NotesEditor from "./partials/NotesEditor";
import { Link } from "react-router-dom";
import { PlusCircle, X } from "react-feather";
import Select from "react-select";
import useLocationData from "../../hooks/useLocationData";

const TransactionFormModal = ({
  show,
  handleClose,
  title = "Transaction",
  customers = [],
  productList = [],
  statusList = [],
  selectedDate,
  onDateChange,
  transactionData = {},
  onChange,
  onSubmit,
  type = "purchase", // or 'purchase', 'expense', etc.
}) => {
  console.log("TransactionFormModal rendered with type:", show);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="xl"
      backdrop="static"
      className="transaction-modal"
    >
      <Modal.Header className="border-0">
        <Modal.Title as="h4">{`${
          type === "sale" ? "Sale" : "Purchase"
        } ${title}`}</Modal.Title>

        <button
          type="button"
          className="btn btn-sm btn-danger remove-image-button"
          aria-label="Close"
          onClick={handleClose}
          // style={{ position: "absolute", right: "10px", top: "10px" }}
        >
          <X size={12} />
        </button>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col lg={3} md={6}>
              {/* <SelectInput
                label={type === "sale" ? "Customer Name" : "Supplier Name"}
                options={customers}
                value={transactionData.supplier}
                onChange={(val) => onChange("supplier", val)}
              /> */}
              <div className="mb-3">
                <label className="form-label">
                  Customer Name
                  <span className="text-danger ms-1">*</span>
                </label>
                <div className="row">
                  <div className="col-lg-10 col-sm-10 col-10">
                    <Select
                      classNamePrefix="react-select"
                      // options={CustomerName}

                      placeholder="Choose"
                    />
                  </div>
                  <div className="col-lg-2 col-sm-2 col-2 ps-0">
                    <div className="add-icon">
                      <Link to="#" className="bg-dark text-white p-2 rounded">
                        <PlusCircle />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <DateInput value={selectedDate} onChange={onDateChange} />
            </Col>

            <Col lg={3} md={6}>
              <SelectInput
                label="Product Name"
                options={productList}
                value={transactionData.product}
                onChange={(val) => onChange("product", val)}
              />
            </Col>

            <Col lg={3} md={6}>
              <TextInput
                label="Reference No"
                value={transactionData.referenceNo}
                onChange={(e) => onChange("referenceNo", e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={12}>
              <TextInput
                label="Product Code"
                placeholder="Please type product code and select"
                value={transactionData.productCode}
                onChange={(e) => onChange("productCode", e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mt-4">
            <Col lg={12}>
              <ProductTable
                products={transactionData.products || []}
                onDelete={(index) => onChange("removeProduct", index)}
              />
            </Col>
          </Row>

          <Row className="justify-content-end mt-4">
            <Col lg={6}>
              <TotalSummary totals={transactionData.totals} />
            </Col>
          </Row>

          <Row className="mt-3">
            {["Order Tax", "Discount", "Shipping"].map((label) => (
              <Col lg={3} sm={6} key={label}>
                <TextInput
                  label={label}
                  value={transactionData[label.toLowerCase()]}
                  onChange={(e) =>
                    onChange(label.toLowerCase(), e.target.value)
                  }
                />
              </Col>
            ))}

            <Col lg={3} sm={6}>
              <SelectInput
                label="Status"
                options={statusList}
                value={transactionData.status}
                onChange={(val) => onChange("status", val)}
              />
            </Col>
          </Row>

          <Row className="mt-4">
            <Col lg={12}>
              <NotesEditor />
            </Col>
          </Row>

          <Modal.Footer className="border-0 mt-4">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionFormModal;
