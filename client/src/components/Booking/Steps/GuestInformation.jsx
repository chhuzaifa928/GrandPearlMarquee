import "./GuestInformation.css";

import { validateGuests } from "../../../utils/bookingValidation";

import {
  getCurrentGuestCount,
  getRemainingGuests,
  getRecommendedTables,
  checkHallCapacity,
  isGuestCountCorrect,
} from "../../../utils/bookingCalculations";

function GuestInformation({
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

    const validationErrors = validateGuests(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      nextStep();

    }

  };

  const currentGuests = getCurrentGuestCount(formData);

  const remainingGuests = getRemainingGuests(formData);

  const tables = getRecommendedTables(formData);

  const hall = checkHallCapacity(formData);

  const guestCountCorrect = isGuestCountCorrect(formData);

  return (

    <div className="booking-card">

      <h2>Guest Information</h2>

      <p>
        Please enter your guest details.
      </p>

      <div className="row">

        {/* Total Guests */}

        <div className="col-md-6 mb-4">

          <label className="form-label">
            Total Guests <span className="required">*</span>
          </label>

          <input
            type="number"
            name="totalGuests"
            value={formData.totalGuests}
            onChange={handleChange}
            className={`form-control ${
              errors.totalGuests ? "input-error" : ""
            }`}
          />

          {errors.totalGuests && (
            <p className="error-text">
              {errors.totalGuests}
            </p>
          )}

        </div>

        {/* Male Guests */}

        <div className="col-md-6 mb-4">

          <label className="form-label">
            Male Guests <span className="required">*</span>
          </label>

          <input
            type="number"
            name="maleGuests"
            value={formData.maleGuests}
            onChange={handleChange}
            className={`form-control ${
              errors.maleGuests ? "input-error" : ""
            }`}
          />

          {errors.maleGuests && (
            <p className="error-text">
              {errors.maleGuests}
            </p>
          )}

        </div>

        {/* Male VIP */}

        <div className="col-md-6 mb-4">

          <label className="form-label">

            Male VIP Guests

          </label>

          <input
            type="number"
            name="maleVIP"
            value={formData.maleVIP}
            onChange={handleChange}
            className="form-control"
          />

        </div>

        {/* Female Guests */}

        <div className="col-md-6 mb-4">

          <label className="form-label">
            Female Guests <span className="required">*</span>
          </label>

          <input
            type="number"
            name="femaleGuests"
            value={formData.femaleGuests}
            onChange={handleChange}
            className={`form-control ${
              errors.femaleGuests ? "input-error" : ""
            }`}
          />

          {errors.femaleGuests && (
            <p className="error-text">
              {errors.femaleGuests}
            </p>
          )}

        </div>

        {/* Female VIP */}

        <div className="col-md-6 mb-4">

          <label className="form-label">

            Female VIP Guests

          </label>

          <input
            type="number"
            name="femaleVIP"
            value={formData.femaleVIP}
            onChange={handleChange}
            className="form-control"
          />

        </div>

      </div>

      {/* Summary Card */}

      <div className="booking-summary-card mt-4">

        <h4>📊 Guest Summary</h4>

        <div className="summary-row">
          <span>Total Guests</span>
          <strong>{formData.totalGuests || 0}</strong>
        </div>

        <div className="summary-row">
          <span>Current Count</span>
          <strong>{currentGuests}</strong>
        </div>

        {guestCountCorrect ? (

          <p className="text-success mt-3">
            ✅ Guest count is correct.
          </p>

        ) : (

          <p className="text-warning mt-3">

            ⚠ {Math.abs(remainingGuests)} guest(s)

            {remainingGuests > 0
              ? " remaining."
              : " exceed the total."}

          </p>

        )}

        <hr />

        <div className="summary-row">

          <span>Recommended Tables</span>

          <strong>{tables} Tables</strong>

        </div>

        <small className="text-muted">

          Based on 10 guests per table

        </small>

        <hr />

        <div className="summary-row">

          <span>Hall Capacity</span>

          <strong>{hall.capacity} Guests</strong>

        </div>

        {hall.exceeded ? (

          <p className="text-danger mt-2">

            ⚠ Guest count exceeds hall capacity.

            Our team will review your request.

          </p>

        ) : (

          <p className="text-success mt-2">

            ✅ Suitable for Grand Pearl Hall.

          </p>

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
          onClick={handleNext}
        >
          Next →
        </button>

      </div>

    </div>

  );

}

export default GuestInformation;