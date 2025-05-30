import React from "react";
import TableTopHead from "./tableTopHead";

const CommonTableHeader = ({ title, modalId, onAdd }) => (
  <div className="page-header">
    <div className="add-item d-flex">
      <div className="page-title">
        <h4 className="fw-bold">{title} List</h4>
        <p>Manage your {title.toLowerCase()}s List</p>
      </div>
    </div>
    <TableTopHead />
    <div className="page-btn">
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
        onClick={onAdd}
      >
        + Add {title}
      </button>
    </div>
  </div>
);

export default CommonTableHeader;
