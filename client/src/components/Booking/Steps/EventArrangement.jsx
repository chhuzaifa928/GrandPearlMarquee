function EventArrangement({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) {

  const handleChange = (e) => {
    setFormData({
      ...formData,
      partition: e.target.value,
    });
  };

  return (

    <div className="booking-card">

      <h2>Event Arrangement</h2>

      <p>
        Please let us know if you require separate seating arrangements
        for male and female guests.
      </p>

      <div className="mb-5">

        <label className="form-label fw-bold">
          Separate Seating Arrangement Required? *
        </label>

        <div className="mt-3">

          <div className="form-check mb-3">

            <input
              className="form-check-input"
              type="radio"
              name="partition"
              id="partitionYes"
              value="Yes"
              checked={formData.partition === "Yes"}
              onChange={handleChange}
            />

            <label
              className="form-check-label"
              htmlFor="partitionYes"
            >
              Yes
            </label>

          </div>

          <div className="form-check">

            <input
              className="form-check-input"
              type="radio"
              name="partition"
              id="partitionNo"
              value="No"
              checked={formData.partition === "No"}
              onChange={handleChange}
            />

            <label
              className="form-check-label"
              htmlFor="partitionNo"
            >
              No
            </label>

          </div>

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
          onClick={nextStep}
        >
          Next →
        </button>

      </div>

    </div>

  );

}

export default EventArrangement;