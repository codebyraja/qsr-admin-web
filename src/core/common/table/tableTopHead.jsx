import React from "react";
import TooltipIcons from "../tooltip-content/tooltipIcons";
import RefreshIcon from "../tooltip-content/refresh";
import CollapesIcon from "../tooltip-content/collapes";

const TableTopHead = () => {
  return (
    <>
      <ul className="table-top-head">
        <TooltipIcons />
        <RefreshIcon />
        <CollapesIcon />
      </ul>
    </>
  );
};

export default TableTopHead;
