import { useState } from "react";
import "./ReviewBooking.css";

import decorPackages from "../../../data/decorPackages";
import foodPackages from "../../../data/foodPackages";
import extraServices from "../../../data/extraServices";

import BookingSuccessModal from "../BookingSuccessModal";

// NEW
import { createBooking } from "../../../services/bookingService";
function ReviewBooking({
  formData,
  prevStep,
}) {

  const [showSuccess, setShowSuccess] = useState(false);
const [loading, setLoading] = useState(false);

  const selectedDecor = decorPackages.find(
    (item) => item.id === formData.decorId
  );

  const selectedFood = foodPackages.find(
    (item) => item.id === formData.foodId
  );

  const selectedExtras = extraServices.filter(
    (item) => formData.extras.includes(item.id)
  );

  const submitBooking = async () => {

  try {

    setLoading(true);

    const bookingData = {

      customer_name: formData.fullName,

      email: formData.email,

      phone: formData.phone,

      event_type: formData.eventType,

      event_date: formData.eventDate,

      event_time: formData.eventTime,

      guests: Number(formData.totalGuests),

      vip_guests:
        Number(formData.maleVIP) +
        Number(formData.femaleVIP),

      partition_required:
        formData.partition === "Yes",

      food_category:
        selectedFood?.title || "",

      custom_food: "",

      decor_theme:
        selectedDecor?.title || "",

      additional_requirements:
        formData.notes,

      sound_system:
        formData.extras.includes("sound"),

      ac_required:
        formData.extras.includes("ac"),

      heater_required:
        formData.extras.includes("heater")

    };

    const response = await createBooking(bookingData);

    if (response.success) {

      setShowSuccess(true);

    }

  } catch (error) {

    alert(error.message || "Booking failed.");

  } finally {

    setLoading(false);

  }

};

  return (
    <>
      <div className="booking-card">

        <h2>Review Your Booking</h2>

        <p>
          Please review all the information before submitting your booking request.
        </p>

        <div className="table-responsive">

          <table className="table table-bordered">

            <tbody>

              <tr>
                <th>Full Name</th>
                <td>{formData.fullName}</td>
              </tr>

              <tr>
                <th>Phone</th>
                <td>{formData.phone}</td>
              </tr>

              <tr>
                <th>WhatsApp</th>
                <td>{formData.whatsapp}</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>{formData.email || "-"}</td>
              </tr>

              <tr>
                <th>City</th>
                <td>{formData.city}</td>
              </tr>

              <tr>
                <th>Event Type</th>
                <td>{formData.eventType}</td>
              </tr>

              <tr>
                <th>Event Date</th>
                <td>{formData.eventDate}</td>
              </tr>

              <tr>
                <th>Time Slot</th>
                <td>{formData.eventTime}</td>
              </tr>

              <tr>
                <th>Total Guests</th>
                <td>{formData.totalGuests}</td>
              </tr>

              <tr>
                <th>Male Guests</th>
                <td>{formData.maleGuests}</td>
              </tr>

              <tr>
                <th>Female Guests</th>
                <td>{formData.femaleGuests}</td>
              </tr>

              <tr>
                <th>Male VIP</th>
                <td>{formData.maleVIP}</td>
              </tr>

              <tr>
                <th>Female VIP</th>
                <td>{formData.femaleVIP}</td>
              </tr>

              <tr>
                <th>Separate Seating</th>
                <td>{formData.partition}</td>
              </tr>

              <tr>
                <th>Decor Package</th>
                <td>{selectedDecor?.title || "-"}</td>
              </tr>

              <tr>
                <th>Food Package</th>
                <td>{selectedFood?.title || "-"}</td>
              </tr>

              <tr>
                <th>Extra Services</th>
                <td>
                  {selectedExtras.length > 0
                    ? selectedExtras.map(service => service.title).join(", ")
                    : "None"}
                </td>
              </tr>

              <tr>
                <th>Additional Requirements</th>
                <td>{formData.notes || "-"}</td>
              </tr>

            </tbody>

          </table>

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
  onClick={submitBooking}
  disabled={loading}
>
  {loading ? "Submitting..." : "Submit Booking Request →"}
</button>

        </div>

      </div>

      <BookingSuccessModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
}

export default ReviewBooking;