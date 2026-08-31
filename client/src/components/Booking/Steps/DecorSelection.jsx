import decorPackages from "../../../data/decorPackages";
import { useToast } from "../../../hooks/useToast";

function DecorSelection({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) {
  const toast = useToast();
  // ============================================
  // SELECT EXISTING DECOR
  // ============================================

  const selectDecor = (decorId) => {
    setFormData({
      ...formData,
      decorId,
      customDecorCategory: "",
    });
  };

  // ============================================
  // SELECT CUSTOM DECOR CATEGORY
  // ============================================

  const selectCustomDecor = () => {
    setFormData({
      ...formData,
      decorId: "custom",
      customDecorCategory:
        formData.customDecorCategory || "",
    });
  };

  // ============================================
  // CUSTOM DECOR CATEGORY CHANGE
  // ============================================

  const handleCustomDecorChange = (e) => {
    setFormData({
      ...formData,
      decorId: "custom",
      customDecorCategory: e.target.value,
    });
  };

  // ============================================
  // NEXT
  // ============================================

  const handleNext = () => {
    if (
      formData.decorId === "custom" &&
      !formData.customDecorCategory?.trim()
    ) {
      toast.warning("Please enter the decor category you want.");
      return;
    }

    if (!formData.decorId) {
      toast.warning("Please select a decor package.");
      return;
    }

    nextStep();
  };

  return (
    <div className="booking-card">

      <h2>Select Decor Package</h2>

      <p>
        Choose your preferred décor package for your event.
      </p>

      {/* ============================================
          EXISTING DECOR PACKAGES
      ============================================ */}

      <div className="row">

        {decorPackages.map((item) => (

          <div
            className="col-lg-4 col-md-6 mb-4"
            key={item.id}
          >

            <div
              className={`booking-package-card ${
                formData.decorId === item.id
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                selectDecor(item.id)
              }
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

                {formData.decorId === item.id && (
                  <div className="selected-label">
                    ✓ Selected
                  </div>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* ============================================
          CUSTOM DECOR CATEGORY
      ============================================ */}

      <div className="custom-food-section mt-4">

        <div
          className={`booking-package-card ${
            formData.decorId === "custom"
              ? "selected"
              : ""
          }`}
          onClick={selectCustomDecor}
        >

          <div className="package-body">

            <span className="package-category">
              Custom
            </span>

            <h4>
              Other / Custom Decor Category
            </h4>

            <p>
              Don't see the decor category you
              need? Enter your preferred category
              below and our team will review it.
            </p>

            {formData.decorId === "custom" && (
              <div
                className="mt-3"
                onClick={(event) =>
                  event.stopPropagation()
                }
              >

                <label className="form-label">
                  Enter Your Decor Category{" "}
                  <span className="required">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Dholki, Baby Shower, Anniversary"
                  value={
                    formData.customDecorCategory || ""
                  }
                  onChange={
                    handleCustomDecorChange
                  }
                />

              </div>
            )}

            {formData.decorId === "custom" && (
              <div className="selected-label mt-3">
                ✓ Custom Decor Selected
              </div>
            )}

          </div>

        </div>

      </div>

      {/* ============================================
          NAVIGATION
      ============================================ */}

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
          disabled={
            !formData.decorId ||
            (
              formData.decorId === "custom" &&
              !formData.customDecorCategory?.trim()
            )
          }
        >
          Next →
        </button>

      </div>

    </div>
  );
}

export default DecorSelection;