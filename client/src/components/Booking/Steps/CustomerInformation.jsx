import "./CustomerInformation.css";
import { validateCustomer } from "../../../utils/bookingValidation";
import StepHeader from "../../Common/StepHeader";
import { FaUser } from "react-icons/fa";
function CustomerInformation({
  formData,
  setFormData,
  nextStep,
  errors,
  setErrors,
}) {

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Remove error as user types
    if (errors[name]) {

      setErrors({
        ...errors,
        [name]: "",
      });

    }

  };

  const handleNext = () => {

    const validationErrors = validateCustomer(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      nextStep();

    }

  };

  return (

    <div className="booking-card">
<StepHeader
    icon={<FaUser />}
    title="Customer Information"
    subtitle="Please provide your contact information."
/>
      <div className="row">

        {/* Full Name */}

        <div className="col-md-6 mb-4">

          <label className="form-label">

            Full Name <span className="required">*</span>

          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`form-control ${
              errors.fullName ? "input-error" : ""
            }`}
          />

          {errors.fullName && (
            <p className="error-text">
              {errors.fullName}
            </p>
          )}

        </div>

        {/* Phone */}

        <div className="col-md-6 mb-4">

          <label className="form-label">

            Phone Number <span className="required">*</span>

          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`form-control ${
              errors.phone ? "input-error" : ""
            }`}
          />

          {errors.phone && (
            <p className="error-text">
              {errors.phone}
            </p>
          )}

        </div>

        {/* WhatsApp */}

        <div className="col-md-6 mb-4">

          <label className="form-label">

            WhatsApp Number <span className="required">*</span>

          </label>

          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className={`form-control ${
              errors.whatsapp ? "input-error" : ""
            }`}
          />

          {errors.whatsapp && (
            <p className="error-text">
              {errors.whatsapp}
            </p>
          )}

        </div>

        {/* Email */}

        <div className="col-md-6 mb-4">

          <label className="form-label">

            Email (Optional)

          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />

        </div>

        {/* City */}

        <div className="col-12 mb-4">

          <label className="form-label">

            City <span className="required">*</span>

          </label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`form-control ${
              errors.city ? "input-error" : ""
            }`}
          />

          {errors.city && (
            <p className="error-text">
              {errors.city}
            </p>
          )}

        </div>

      </div>

      <div className="text-end">

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

export default CustomerInformation;