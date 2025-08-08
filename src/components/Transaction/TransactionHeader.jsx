// TransactionHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import TooltipIcons from "../../core/common/tooltip-content/tooltipIcons";
import RefreshIcon from "../../core/common/tooltip-content/refresh";
import CollapesIcon from "../../core/common/tooltip-content/collapes";

const TransactionHeader = ({
  title,
  subtitle,
  productModalIsOpen,
  modalId,
  importModalId,
  addLabel,
  importLabel,
}) => (
  <div className="page-header">
    <div className="add-item d-flex">
      <div className="page-title">
        <h4>{title}</h4>
        <h6>{subtitle}</h6>
      </div>
    </div>
    <ul className="table-top-head">
      <TooltipIcons />
      <RefreshIcon />
      <CollapesIcon />
    </ul>
    <div className="page-btn">
      <Link
        to="#"
        className="btn btn-primary"
        // data-bs-toggle="modal"
        onClick={productModalIsOpen}
        // data-bs-target={`#${modalId}`}
      >
        <i className="ti ti-circle-plus me-1"></i> {addLabel}
      </Link>
    </div>
    <div className="page-btn import">
      <Link
        to="#"
        className="btn btn-secondary color"
        data-bs-toggle="modal"
        data-bs-target={`#${importModalId}`}
      >
        <i className="ti ti-download me-2"></i> {importLabel}
      </Link>
    </div>
  </div>
);

export default TransactionHeader;
