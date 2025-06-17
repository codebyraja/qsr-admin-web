import React from "react";
import { Link } from "react-router-dom";
import { Eye, Edit, Trash2 } from "react-feather";

interface Props {
  handleViewClick: () => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
  deleteModalId?: string;
}

const ProductActionButtons: React.FC<Props> = ({
  handleViewClick,
  handleEditClick,
  handleDeleteClick,
  deleteModalId = "delete-modal",
}) => {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link
          to="#"
          className="me-2 p-2"
          onClick={(e) => {
            e.preventDefault();
            handleViewClick();
          }}
        >
          <Eye className="feather-view" />
        </Link>
        <Link
          to="#"
          className="me-2 p-2"
          onClick={(e) => {
            e.preventDefault();
            handleEditClick();
          }}
        >
          <Edit className="feather-edit" />
        </Link>
        <Link
          to="#"
          className="confirm-text p-2"
          data-bs-toggle="modal"
          data-bs-target={`#${deleteModalId}`}
          onClick={(e) => {
            e.preventDefault();
            handleDeleteClick();
          }}
        >
          <Trash2 className="feather-trash-2" />
        </Link>
      </div>
    </div>
  );
};

export default ProductActionButtons;
