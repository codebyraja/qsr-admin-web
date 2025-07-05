import React, { useState, useEffect } from "react";
import { Modal, Table, Button, Form } from "react-bootstrap";
import { X } from "react-feather";

const ExcelPreviewModal = ({ show, onClose, data, onDeleteRow }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchFilters, setSearchFilters] = useState({});

  useEffect(() => {
    if (data?.length > 0) {
      setFilteredData(data);
    }
  }, [data]);

  if (!data || data.length === 0) return null;

  const headers = data[0];
  const rows = data.slice(1);

  const applyFilter = (filters) => {
    const filtered = rows.filter((row) =>
      row.every((cell, index) => {
        const searchValue = filters[index]?.toLowerCase();
        if (!searchValue) return true;
        return String(cell || "")
          .toLowerCase()
          .includes(searchValue);
      })
    );
    setFilteredData([headers, ...filtered]);
  };

  const handleSearchChange = (index, value) => {
    const updatedFilters = { ...searchFilters, [index]: value };
    setSearchFilters(updatedFilters);
    applyFilter(updatedFilters);
  };

  return (
    <Modal show={show} onHide={onClose} size="xl" centered>
      <Modal.Header>
        <Modal.Title className="fw-bold">🔍 Excel Data Preview</Modal.Title>
        <button
          type="button"
          className="modal-close-button"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={12} />
        </button>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: "70vh", overflow: "auto" }}>
        <div className="table-responsive shadow-sm rounded border">
          <Table bordered hover className="align-middle mb-0 text-center">
            <thead className="table-light sticky-top">
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>
                    <div className="d-flex flex-column align-items-center">
                      <span className="fw-semibold">{header}</span>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Search..."
                        className="mt-1"
                        onChange={(e) =>
                          handleSearchChange(index, e.target.value)
                        }
                      />
                    </div>
                  </th>
                ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>
                      {typeof cell === "string" &&
                      (cell.startsWith("http") ||
                        cell.startsWith("data:image")) ? (
                        <img
                          src={cell}
                          alt="preview"
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "cover",
                            borderRadius: 6,
                            boxShadow: "0 0 3px #aaa",
                          }}
                        />
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onDeleteRow(rowIndex)}
                    >
                      ❌
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredData.length <= 1 && (
                <tr>
                  <td colSpan={headers.length + 1} className="text-muted">
                    No matching rows
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExcelPreviewModal;
