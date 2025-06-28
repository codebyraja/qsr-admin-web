import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import ImageWithBasePath from "../../core/img/imagewithbasebath";

interface Props {
  exportToPdf: () => void;
  exportToExcel: () => void;
  onRefreshClick: () => void;
  isHeaderCollapsed: boolean;
  onCollapseToggle: () => void;
  showIcons?: {
    pdf?: boolean,
    excel?: boolean,
    refresh?: boolean,
    collapse?: boolean,
  };
}

const TableHeaderActionMenu: React.FC<Props> = ({
  exportToPdf,
  exportToExcel,
  onRefreshClick,
  isHeaderCollapsed,
  onCollapseToggle,
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
          <li onClick={exportToPdf}>
            <Tooltip title="Pdf">
              <Link to="#">
                <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
              </Link>
            </Tooltip>
          </li>
        )}

        {showIcons.excel && (
          <li onClick={exportToExcel}>
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
              onRefreshClick();
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
                onClick={onCollapseToggle}
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

export default TableHeaderActionMenu;
