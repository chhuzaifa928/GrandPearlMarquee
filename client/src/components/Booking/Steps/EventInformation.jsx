import "./EventInformation.css";
import { validateEvent } from "../../../utils/bookingValidation";

function EventInformation({
  formData,
  setFormData,
  nextStep,
  prevStep,
  errors,
  setErrors,
}) {

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {

      setErrors({
        ...errors,
        [name]: "",
      });

    }

  };

  const handleNext = () => {

    const validationErrors = validateEvent(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      nextStep();

    }

  };

  return (

    <div className="booking-card">

      <h2>Event Information</h2>

      <p>
        Tell us about your event.
      </p>

      <div className="row">

        {/* Event Type */}

        <div className="col-md-4 mb-4">

          <label className="form-label">

            Event Type <span className="required">*</span>

          </label>

          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className={`form-select ${
              errors.eventType ? "input-error" : ""
            }`}
          >

            <option value="">Select Event</option>

            <option>Barat</option>
            <option>Walima</option>
            <option>Mehndi</option>
            <option>Nikkah</option>
            <option>Birthday</option>
            <option>Corporate</option>
            <option>Gathering</option>

          </select>

          {errors.eventType && (
            <p className="error-text">
              {errors.eventType}
            </p>
          )}

        </div>

        {/* Date */}

        <div className="col-md-4 mb-4">

          <label className="form-label">

            Event Date <span className="required">*</span>

          </label>

          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className={`form-control ${
              errors.eventDate ? "input-error" : ""
            }`}
          />

          {errors.eventDate && (
            <p className="error-text">
              {errors.eventDate}
            </p>
          )}

        </div>

        {/* Time */}

        <div className="col-md-4 mb-4">

          <label className="form-label">

            Time Slot <span className="required">*</span>

          </label>

          <select
            name="eventTime"
            value={formData.eventTime}
            onChange={handleChange}
            className={`form-select ${
              errors.eventTime ? "input-error" : ""
            }`}
          >

            <option value="">
              Select Time
            </option>

            <option>Afternoon</option>
            <option>Evening</option>
            <option>Night</option>

          </select>

          {errors.eventTime && (
            <p className="error-text">
              {errors.eventTime}
            </p>
          )}

        </div>

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
          onClick={handleNext}
        >
          Next →
        </button>

      </div>

    </div>

  );

}

export default EventInformation;