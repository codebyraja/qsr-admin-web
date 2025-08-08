import React from "react";
import { Download } from "react-feather";
import { Link } from "react-router-dom";
import TableActionBar from "./DataTableActionBar";

interface Props {
  title: string;
  subtitle?: string;
  importLabel?: string;
  addButtonLabel?: string;
  showImport?: boolean;
  onNavigate?: () => void;
  showImportModal?: () => void;
  onExportExcel?: () => void;
  onExportPdf?: () => void;
  onRefresh?: () => void;
  handleAddClick?: () => void;
  showIcons?: {
    pdf?: boolean,
    excel?: boolean,
    refresh?: boolean,
    collapse?: boolean,
  };
  exportData?: any[];
  onToggleCollapse?: () => void;
  isHeaderCollapsed?: boolean;
}

const DataTableHeader: React.FC<Props> = ({
  title,
  subtitle,
  importLabel,
  addButtonLabel,
  showImport = false,
  onNavigate = () => {},
  showImportModal = () => {},
  onExportExcel = () => {},
  onExportPdf = () => {},
  onRefresh = () => {},
  showIcons = {
    pdf: true,
    excel: true,
    refresh: true,
    collapse: true,
  },
  exportData = [],
  onToggleCollapse = () => {},
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
      <TableActionBar
        onExportPdf={onExportPdf}
        onExportExcel={onExportExcel}
        onRefresh={onRefresh}
        onToggleCollapse={onToggleCollapse}
        isHeaderCollapsed={isHeaderCollapsed}
        showIcons={showIcons}
      />
      <div className="page-btn">
        <button className="btn btn-primary" onClick={onNavigate}>
          + {addButtonLabel}
        </button>
      </div>

      {showImport && (
        <div className="page-btn import">
          <Link
            to="#"
            className="btn btn-secondary color"
            onClick={showImportModal}
          >
            <Download className="feather me-2" />
            {importLabel || "Import"}
          </Link>
        </div>
      )}
    </div>
  );
};

export default DataTableHeader;
