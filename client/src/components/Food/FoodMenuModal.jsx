import { Link } from "react-router-dom";

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

          <div className="modal-header">

            <h4 className="modal-title">
              {selectedFood.title}
            </h4>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>

          </div>

          <div className="modal-body">

            <img
              src={selectedFood.image}
              alt={selectedFood.title}
              className="img-fluid rounded mb-4"
            />

            <h5 className="mb-3">
              🍽 Menu Includes
            </h5>

            <div className="row">

              {selectedFood.menu.map((dish, index) => (

                <div
                  className="col-md-6 mb-2"
                  key={index}
                >
                  ✅ {dish}
                </div>

              ))}

            </div>

          </div>

          <div className="modal-footer">

            <Link
              to="/booking"
              className="btn btn-gold"
            >
              Book This Package
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default FoodMenuModal;