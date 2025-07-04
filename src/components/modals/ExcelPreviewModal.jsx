import React from "react";
import { Modal, Table, Button } from "react-bootstrap";

const ExcelPreviewModal = ({ show, onClose, data, onDeleteRow }) => {
  if (!data || data.length === 0) return null;

  const headers = data[0];
  const rows = data.slice(1);

  return (
    <Modal show={show} onHide={onClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Excel Data Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <Table
          bordered
          hover
          responsive
          className="text-center align-middle shadow-sm"
        >
          <thead className="table-light sticky-top">
            <tr>
              {headers.map((header, i) => (
                <th key={i}>{header}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
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
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
