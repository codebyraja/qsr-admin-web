import { useState } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import Select from "react-select";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { X } from "react-feather";
import { toast } from "react-toastify";
import { readExcelFile } from "../../utils/excelUtils";
import ExcelPreviewModal from "./ExcelPreviewModal";

const ImportProduct = ({
  title,
  label = "Select Action",
  show,
  actionOptions,
  isLoading,
  handleClose,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const templateMap = {
    product: "/templates/product_template.xlsx",
    stock: "/templates/product_stock_template.xlsx",
  };

  const handleDownloadTemplate = () => {
    if (!selectedOption?.value) return toast.warning("Select an option first");
    const url = templateMap[selectedOption.value];
    if (!url) return toast.error("Template not found");

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `template_${selectedOption.value}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      readExcelFile(
        file,
        (parsed) => {
          setPreviewData(parsed);
          setShowPreviewModal(true);
        },
        (err) => console.error("Excel read error:", err)
      );
    }
  };

  const handleDeleteRow = (rowIndex) => {
    const newData = [...previewData];
    newData.splice(rowIndex + 1, 1); // skip header
    setPreviewData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOption || !selectedFile) {
      toast.warning("Please select action and upload file.");
      return;
    }

    console.log("Submitting:", selectedOption.label, selectedFile);
    // Send to API
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <button
            type="button"
            className="modal-close-button"
            aria-label="Close"
            onClick={handleClose}
          >
            <X size={12} />
          </button>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={12}>
                <Form.Group controlId="productSelect">
                  <Form.Label>
                    {label} <span className="text-danger">*</span>
                  </Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={actionOptions}
                    value={selectedOption}
                    onChange={setSelectedOption}
                    isSearchable={false}
                    placeholder="Choose"
                  />
                </Form.Group>
              </Col>

              <Col md={12} className="mt-3">
                <Button
                  variant="outline-primary"
                  onClick={handleDownloadTemplate}
                  disabled={!selectedOption}
                >
                  Download Sample File
                </Button>
              </Col>

              <Col md={12} className="mt-3 mb-3">
                <Form.Group controlId="fileUpload">
                  <Form.Label>Upload Excel File</Form.Label>
                  <div className="image-upload download">
                    <Form.Control
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileChange}
                    />
                    <div className="image-uploads mt-2 text-center">
                      <ImageWithBasePath
                        src="assets/img/download-img.png"
                        alt="img"
                      />
                      <h4>
                        Drag and drop a <span>file to upload</span>
                      </h4>
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Importing...
                </>
              ) : (
                "Import"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Excel Preview Modal */}
      <ExcelPreviewModal
        show={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        data={previewData}
        onDeleteRow={handleDeleteRow}
      />
    </>
  );
};

export default ImportProduct;
