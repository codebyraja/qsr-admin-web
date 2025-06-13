import React from "react";
import { Link } from "react-router-dom";
import { Eye, Edit, Trash2 } from "react-feather";

interface Props {
  viewLink: string;
  editLink: string;
  onDelete: () => void;
  deleteModalId?: string;
}

const ProductActionButtons: React.FC<Props> = ({
  viewLink,
  editLink,
  onDelete,
  deleteModalId = "delete-modal",
}) => {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link to={viewLink} className="me-2 p-2">
          <Eye className="feather-view" />
        </Link>
        <Link to={editLink} className="me-2 p-2">
          <Edit className="feather-edit" />
        </Link>
        <Link
          to="#"
          className="confirm-text p-2"
          data-bs-toggle="modal"
          data-bs-target={`#${deleteModalId}`}
          onClick={onDelete}
        >
          <Trash2 className="feather-trash-2" />
        </Link>
      </div>
    </div>
  );
};

export default ProductActionButtons;
