import React from "react";
import TableHeaderActionMenu from "./TableHeaderActionMenu";
import { Download } from "react-feather";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  subtitle?: string;
  addButtonLabel?: string;
  addButtonRoute?: string;
  showImport?: boolean;
  exportToPdf?: () => void;
  exportToExcel?: () => void;
  onRefresh?: () => void;
  handleAddClick?: () => void;
  showIcons?: {
    pdf?: boolean,
    excel?: boolean,
    refresh?: boolean,
    collapse?: boolean,
  };
  onCollapseToggle?: () => void;
  isHeaderCollapsed?: boolean;
}

const TableHeaderActions: React.FC<Props> = ({
  title,
  subtitle,
  addButtonLabel,
  // addButtonRoute = "#",
  onAddClick = () => {},
  showImport = false,
  exportToPdf = () => {},
  exportToExcel = () => {},
  onRefreshClick = () => {},
  showIcons = {
    pdf: true,
    excel: true,
    refresh: true,
    collapse: true,
  },
  onCollapseToggle = () => {},
  isHeaderCollapsed = false,
}) => {
  return (
    <div className="page-header">
      <div className="add-item d-flex">
        <div className="page-title">
          <h4>{title}</h4>
          <h6>{subtitle}</h6>
        </div>
      </div>
      <TableHeaderActionMenu
        exportToPdf={exportToPdf}
        exportToExcel={exportToExcel}
        onRefreshClick={onRefreshClick}
        isHeaderCollapsed={isHeaderCollapsed}
        onCollapseToggle={onCollapseToggle}
        showIcons={showIcons}
      />
      <div className="page-btn">
        <button className="btn btn-primary" onClick={onAddClick}>
          + {addButtonLabel}
        </button>
      </div>

      {showImport && (
        <div className="page-btn import">
          <Link
            to="#"
            className="btn btn-secondary color"
            data-bs-toggle="modal"
            data-bs-target="#view-notes"
          >
            <Download className="feather me-2" />
            Import 
          </Link>
        </div>
      )}
    </div>
  );
};

export default TableHeaderActions;
