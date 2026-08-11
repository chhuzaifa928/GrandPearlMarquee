function FoodMenuModal({ selectedFood }) {
  if (!selectedFood) return null;

  return (
    <div
      className="modal fade"
      id="foodMenuModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          {/* Header */}
          <div className="modal-header">

            <h4 className="modal-title">
              {selectedFood.item_name}
            </h4>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>

          </div>

          {/* Body */}
          <div className="modal-body">

            <h5 className="mb-3">
              🍽 Menu
            </h5>

            <div className="p-3 bg-light rounded">

              <h6 className="fw-bold">
                {selectedFood.item_name}
              </h6>

              {selectedFood.description && (
                <p className="mb-0">
                  {selectedFood.description}
                </p>
              )}

            </div>

          </div>

          {/* Footer */}
          <div className="modal-footer">

            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>

            <a
              href="/booking"
              className="btn btn-gold"
            >
              Book This Package
            </a>

          </div>

        </div>
      </div>
    </div>
  );
}

export default FoodMenuModal;