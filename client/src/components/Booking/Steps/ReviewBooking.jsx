import { useState } from "react";
import "./ReviewBooking.css";

import decorPackages from "../../../data/decorPackages";
import foodPackages from "../../../data/foodPackages";
import extraServices from "../../../data/extraServices";

import BookingSuccessModal from "../BookingSuccessModal";

import { createBooking } from "../../../services/bookingService";

function ReviewBooking({
  formData,
  prevStep,
}) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // ============================================
  // SELECTED DECOR
  // ============================================

  const selectedDecor = decorPackages.find(
    (item) => String(item.id) === String(formData.decorId)
  );

  // ============================================
  // SELECTED FOOD
  // ============================================

  const selectedFood = foodPackages.find(
    (item) => String(item.id) === String(formData.foodId)
  );

  // ============================================
  // FALLBACK FOOD
  // ============================================
  // If foodId somehow gets lost, try to find the
  // food package using the event type.

  const fallbackFood = foodPackages.find(
    (item) =>
      item.category?.toLowerCase() ===
      formData.eventType?.toLowerCase()
  );

  const finalFood = selectedFood || fallbackFood;

  // ============================================
  // SELECTED EXTRAS
  // ============================================

  const selectedExtras = extraServices.filter(
    (item) => formData.extras.includes(item.id)
  );

  // ============================================
  // DEBUG
  // ============================================

  console.log("========== BOOKING DEBUG ==========");
  console.log("formData =", formData);
  console.log("formData.foodId =", formData.foodId);
  console.log("selectedFood =", selectedFood);
  console.log("fallbackFood =", fallbackFood);
  console.log("finalFood =", finalFood);
  console.log("selectedDecor =", selectedDecor);
  console.log("===================================");

  // ============================================
  // SUBMIT BOOKING
  // ============================================

  const submitBooking = async () => {
    try {
      setLoading(true);

      // ------------------------------------------
      // Make sure food exists
      // ------------------------------------------

      if (!finalFood) {
        alert(
          "Please select a food package before submitting."
        );

        setLoading(false);
        return;
      }

      // ------------------------------------------
      // Build booking data
      // ------------------------------------------

      const bookingData = {
        // =========================
        // CUSTOMER
        // =========================

        customer_name: formData.fullName,

        email: formData.email || "",

        phone: formData.phone,

        whatsapp: formData.whatsapp,

        city: formData.city,

        // =========================
        // EVENT
        // =========================

        event_type: formData.eventType,

        event_date: formData.eventDate,

        event_time: formData.eventTime,

        // =========================
        // GUESTS
        // =========================

        guests: Number(formData.totalGuests) || 0,

        male_guests:
          Number(formData.maleGuests) || 0,

        female_guests:
          Number(formData.femaleGuests) || 0,

        // =========================
        // VIP
        // =========================

        vip_guests:
          (Number(formData.maleVIP) || 0) +
          (Number(formData.femaleVIP) || 0),

        male_vip:
          Number(formData.maleVIP) || 0,

        female_vip:
          Number(formData.femaleVIP) || 0,

        // =========================
        // ARRANGEMENT
        // =========================

        partition_required:
          formData.partition === "Yes",

        // =========================
        // FOOD
        // =========================
        // IMPORTANT:
        // Backend expects food_category

        food_category: finalFood.category,

        custom_food: "",

        // =========================
        // DECOR
        // =========================

        decor_theme:
          selectedDecor?.title || "",

        // =========================
        // ADDITIONAL REQUIREMENTS
        // =========================

        additional_requirements:
          formData.notes || "",

        // =========================
        // EXTRA SERVICES
        // =========================

        sound_system:
          formData.extras.includes("sound"),

        ac_required:
          formData.extras.includes("ac"),

        heater_required:
          formData.extras.includes("heater"),
      };

      console.log(
        "========== BOOKING DATA SENT =========="
      );

      console.log(bookingData);

      console.log(
        "food_category =",
        bookingData.food_category
      );

      console.log(
        "========================================"
      );

      // ========================================
      // SEND TO BACKEND
      // ========================================

      const response =
        await createBooking(bookingData);

      console.log(
        "SERVER RESPONSE =",
        response
      );

      if (response.success) {
        setShowSuccess(true);
      }

    } catch (error) {
      console.error(
        "BOOKING ERROR:",
        error
      );

      console.error(
        "SERVER RESPONSE:",
        error.response?.data
      );

      const serverErrors =
        error.response?.data?.errors;

      if (serverErrors?.length) {
        alert(
          serverErrors
            .map((err) => err.msg)
            .join("\n")
        );
      } else {
        alert(
          error.response?.data?.message ||
          error.message ||
          "Booking failed."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // UI
  // ============================================

  return (
    <>
      <div className="booking-card">

        <h2>Review Your Booking</h2>

        <p>
          Please review all the information before
          submitting your booking request.
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
                <td>
                  {formData.email || "-"}
                </td>
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

              {/* DECOR */}

              <tr>
                <th>Decor Package</th>

                <td>
                  {selectedDecor?.title || "-"}
                </td>
              </tr>

              {/* FOOD */}

              <tr>
                <th>Food Menu</th>

                <td>
                  {finalFood
                    ? finalFood.title
                    : "-"}
                </td>
              </tr>

              <tr>
                <th>Food Category</th>

                <td>
                  {finalFood
                    ? finalFood.category
                    : "-"}
                </td>
              </tr>

              {/* EXTRA SERVICES */}

              <tr>
                <th>Extra Services</th>

                <td>
                  {selectedExtras.length > 0
                    ? selectedExtras
                        .map(
                          (service) =>
                            service.title
                        )
                        .join(", ")
                    : "None"}
                </td>
              </tr>

              {/* NOTES */}

              <tr>
                <th>
                  Additional Requirements
                </th>

                <td>
                  {formData.notes || "-"}
                </td>
              </tr>

            </tbody>

          </table>

        </div>

        {/* BUTTONS */}

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
            {loading
              ? "Submitting..."
              : "Submit Booking Request →"}
          </button>

        </div>

      </div>

      <BookingSuccessModal
        show={showSuccess}
        onClose={() =>
          setShowSuccess(false)
        }
      />

    </>
  );
}

export default ReviewBooking;