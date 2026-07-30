import decorPackages from "../../../data/decorPackages";

function DecorSelection({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) {

  const selectDecor = (decorId) => {

    setFormData({

        ...formData,

        decorId,

    });
  };

  return (

    <div className="booking-card">

      <h2>Select Decor Package</h2>

      <p>
        Choose your preferred décor package for your event.
      </p>

      <div className="row">

        {decorPackages.map((item) => (

          <div
            className="col-lg-4 col-md-6 mb-4"
            key={item.id}
          >

            <div
              className={`booking-package-card ${
                formData.decorId === item.id ? "selected" : ""
              }`}
             onClick={() => selectDecor(item.id)}
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

        ))}

      </div>

      <div className="d-flex justify-content-between">

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
          disabled={!formData.decorId}
        >
          Next →
        </button>

      </div>

    </div>

  );

}

export default DecorSelection;