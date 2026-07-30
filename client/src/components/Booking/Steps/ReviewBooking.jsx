import { useState } from "react";
import "./ReviewBooking.css";

import decorPackages from "../../../data/decorPackages";
import foodPackages from "../../../data/foodPackages";
import extraServices from "../../../data/extraServices";

import BookingSuccessModal from "../BookingSuccessModal";

function ReviewBooking({
  formData,
  prevStep,
}) {

  const [showSuccess, setShowSuccess] = useState(false);

  const selectedDecor = decorPackages.find(
    (item) => item.id === formData.decorId
  );

  const selectedFood = foodPackages.find(
    (item) => item.id === formData.foodId
  );

  const selectedExtras = extraServices.filter(
    (item) => formData.extras.includes(item.id)
  );

  const submitBooking = () => {

    console.log("Booking Data:", formData);

    // Later this will call the backend API
    setShowSuccess(true);

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
          >
            Submit Booking Request →
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