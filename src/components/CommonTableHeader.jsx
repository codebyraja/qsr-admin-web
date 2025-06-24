const CommonTableHeader = ({ title, onAddClick }) => {
  return (
    <div className="page-header">
      <div className="page-title">
        <h4>{title} List</h4>
        <h6>Manage your {title.toLowerCase()}</h6>
      </div>
      {onAddClick && (
        <div className="page-btn">
          <button className="btn btn-added" onClick={onAddClick}>
            + Add {title}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommonTableHeader;
