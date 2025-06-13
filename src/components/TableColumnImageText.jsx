import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../core/img/imagewithbasebath";

const TableColumnImageText = ({ imageSrc, text }) => (
  <div className="d-flex align-items-center">
    <Link to="#" className="avatar avatar-md me-2">
      <ImageWithBasePath alt={text} src={imageSrc} />
      
    </Link>
    <Link to="#">{text}</Link>
  </div>
);

export default TableColumnImageText;
