import "./ExtraServices.css";
import extraServices from "../../../data/extraServices";

function ExtraServices({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) {

  const toggleService = (serviceId) => {

    const exists = formData.extras.includes(serviceId);

    if (exists) {

      setFormData({
        ...formData,
        extras: formData.extras.filter(id => id !== serviceId),
      });

    } else {

      setFormData({
        ...formData,
        extras: [...formData.extras, serviceId],
      });

    }

  };

  return (

    <div className="booking-card">

      <h2>Extra Services</h2>

      <p>
        Select any additional services required for your event.
      </p>

      <div className="row">

        {extraServices.map(service => (

          <div
            className="col-lg-4 col-md-6 mb-4"
            key={service.id}
          >

            <div
              className={`booking-service-card ${
                formData.extras.includes(service.id)
                  ? "selected"
                  : ""
              }`}
              onClick={() => toggleService(service.id)}
            >

              <div className="package-body text-center">

               <div className="service-icon">
                  {service.icon}
                </div>

                <h4 className="service-title">
  {service.title}
</h4>

                <p className="service-description">
  {service.description}
</p>

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="d-flex flex-wrap justify-content-between">
<div className="additional-notes w-100">

  <label className="form-label fw-bold">
    Additional Requirements
  </label>

  <textarea
    className="form-control"
    rows="3"
    placeholder="Enter any additional requirements for your event..."
    value={formData.notes}
    onChange={(e) =>
      setFormData({
        ...formData,
        notes: e.target.value,
      })
    }
  />

</div>
        <button
          type="button"
          className="btn btn-secondary mt-md-4"
          onClick={prevStep}
        >
          ← Previous
        </button>

        <button
          type="button"
          className="btn btn-gold mt-md-4"
          onClick={nextStep}
        >
          Next →
        </button>

      </div>

    </div>

  );

}

export default ExtraServices;