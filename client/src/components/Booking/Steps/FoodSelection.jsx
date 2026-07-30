import "./FoodSelection.css";
import foodPackages from "../../../data/foodPackages";

function FoodSelection({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) {

  console.log("Selected Event:", formData.eventType);

const filteredFood = foodPackages;

  const selectFood = (foodId) => {
    setFormData({
      ...formData,
      foodId,
    });
  };
console.log("formData =", formData);
console.log("eventType =", JSON.stringify(formData.eventType));
console.log(
  "categories =",
  foodPackages.map(item => item.category)
);
  return (
    <div className="booking-card">

      <h2>Select Food Package</h2>

      <p>
        Choose your preferred food package for your event.
      </p>

      <div className="row">

        {filteredFood.length > 0 ? (

          filteredFood.map((item) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={item.id}
            >

              <div
                className={`booking-package-card ${
                  formData.foodId === item.id ? "selected" : ""
                }`}
                onClick={() => selectFood(item.id)}
              >

                <img
                  src={item.image}
                  alt={item.title}
                  className="img-fluid"
                />

                <div className="package-body">

                  <span className="package-category">
                    {item.category}
                  </span>

                  <h4>{item.title}</h4>

                  <p>{item.description}</p>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="col-12">

            <div className="alert alert-warning">

              No food packages are currently available for the selected event type.

            </div>

          </div>

        )}

      </div>

      <div className="d-flex justify-content-between mt-4">

        <button
          type="button"
          className="btn btn-secondary"
          onClick={prevStep}
        >
          ← Previous
        </button>

        <button
          type="button"
          className="btn btn-gold"
          onClick={nextStep}
          disabled={!formData.foodId}
        >
          Next →
        </button>

      </div>

    </div>
  );
}

export default FoodSelection;