const ModalWrapper = ({ id, title, children }) => (
  <div className="modal fade" id={id} tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
      <div className="modal-content">
        <div className="modal-header border-0 custom-modal-header">
          <h4>{title}</h4>
          <button
            type="button"
            className="close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body custom-modal-body">{children}</div>
      </div>
    </div>
  </div>
);

export default ModalWrapper;
