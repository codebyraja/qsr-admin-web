import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import ImageWithBasePath from "../../core/img/imagewithbasebath";

interface Props {
  onExportPdf: () => void;
  onExportExcel: () => void;
  onRefresh: () => void;
  onToggleCollapse: () => void;
  isHeaderCollapsed: boolean;
  showIcons?: {
    pdf?: boolean,
    excel?: boolean,
    refresh?: boolean,
    collapse?: boolean,
  };
  exportData?: any[];
}

const TableActionBar: React.FC<Props> = ({
  onExportPdf,
  onExportExcel,
  onRefresh,
  onToggleCollapse,
  isHeaderCollapsed,
  showIcons = {
    pdf: true,
    excel: true,
    refresh: true,
    collapse: true,
  },
}) => {
  return (
    <>
      <ul className="table-top-head">
        {showIcons.pdf && (
          <li onClick={onExportPdf}>
            <Tooltip title="Pdf">
              <Link to="#">
                <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
              </Link>
            </Tooltip>
          </li>
        )}

        {showIcons.excel && (
          <li onClick={onExportExcel}>
            <Tooltip title="Excel">
              <Link to="#">
                <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
              </Link>
            </Tooltip>
          </li>
        )}

        {showIcons.refresh && (
          <li
            onClick={(e) => {
              e.preventDefault();
              onRefresh();
            }}
          >
            <Tooltip title="Refresh">
              <Link to="#">
                <i className="ti ti-refresh"></i>
              </Link>
            </Tooltip>
          </li>
        )}
        {showIcons.collapse && (
          <li onClick={(e) => e.preventDefault()}>
            <Tooltip title="Collapse">
              <Link
                to="#"
                id="collapse-header"
                className={`${isHeaderCollapsed ? "active" : ""}`}
                onClick={onToggleCollapse}
              >
                <i className="ti ti-chevron-up"></i>
              </Link>
            </Tooltip>
          </li>
        )}
      </ul>
    </>
  );
};

export default TableActionBar;
