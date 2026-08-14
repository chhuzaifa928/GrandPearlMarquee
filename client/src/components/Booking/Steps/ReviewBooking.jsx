import { useState } from "react";
import "./ReviewBooking.css";

import decorPackages from "../../../data/decorPackages";
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
    (item) =>
      String(item.id) === String(formData.decorId)
  );
  const isCustomDecor =
  formData.decorId === "custom";

  // ============================================
// FINAL EVENT TYPE
// ============================================

const finalEventType =
  formData.eventType === "Other / Custom Event"
    ? formData.customEventType?.trim() || ""
    : formData.eventType || "";

  // ============================================
  // SELECTED FOOD
  // ============================================

  const isCustomFood =
    formData.foodId === "custom";

  const finalFood = formData.foodId
    ? {
        id: formData.foodId,
        title: formData.foodName || "",
        category: formData.foodCategory || "",
        description:
          formData.foodDescription || "",
      }
    : null;

  // ============================================
  // SELECTED EXTRAS
  // ============================================

  const selectedExtras = extraServices.filter(
    (item) =>
      formData.extras?.includes(item.id)
  );

  // ============================================
  // DEBUG
  // ============================================

  console.log(
    "========== BOOKING DEBUG =========="
  );

  console.log("formData =", formData);

  console.log(
    "formData.foodId =",
    formData.foodId
  );

  console.log(
    "isCustomFood =",
    isCustomFood
  );

  console.log(
    "finalFood =",
    finalFood
  );

  console.log(
    "selectedDecor =",
    selectedDecor
  );

  console.log(
    "customFood =",
    formData.customFood
  );

  console.log(
    "==================================="
  );

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
      // Custom food validation
      // ------------------------------------------

      if (
        isCustomFood &&
        !formData.customFood?.trim()
      ) {
        alert(
          "Please enter your custom food requirements."
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

        event_type: finalEventType,

        event_date: formData.eventDate,

        event_time: formData.eventTime,

        // =========================
        // GUESTS
        // =========================

        guests:
          Number(formData.totalGuests) || 0,

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

        food_category: isCustomFood
          ? "Custom"
          : finalFood?.category || "",

        custom_food: isCustomFood
          ? formData.customFood?.trim() || ""
          : "",

        // =========================
        // DECOR
        // =========================
decor_theme: isCustomDecor
  ? formData.customDecorCategory?.trim() || ""
  : selectedDecor?.title || "",

        // =========================
        // ADDITIONAL REQUIREMENTS
        // =========================

        additional_requirements:
          formData.notes || "",

        // =========================
        // EXTRA SERVICES
        // =========================

        sound_system:
          formData.extras?.includes("sound") ||
          false,

        ac_required:
          formData.extras?.includes("ac") ||
          false,

        heater_required:
          formData.extras?.includes("heater") ||
          false,
      };

      // ========================================
      // DEBUG BOOKING DATA
      // ========================================

      console.log(
        "========== BOOKING DATA SENT =========="
      );

      console.log(bookingData);

      console.log(
        "food_category =",
        bookingData.food_category
      );

      console.log(
        "custom_food =",
        bookingData.custom_food
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

      // ========================================
      // SUCCESS
      // ========================================

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

              {/* CUSTOMER */}

              <tr>
                <th>Full Name</th>
                <td>
                  {formData.fullName}
                </td>
              </tr>

              <tr>
                <th>Phone</th>
                <td>
                  {formData.phone}
                </td>
              </tr>

              <tr>
                <th>WhatsApp</th>
                <td>
                  {formData.whatsapp}
                </td>
              </tr>

              <tr>
                <th>Email</th>
                <td>
                  {formData.email || "-"}
                </td>
              </tr>

              <tr>
                <th>City</th>
                <td>
                  {formData.city}
                </td>
              </tr>

              {/* EVENT */}

              <tr>
  <th>Event Type</th>
  <td>{finalEventType || "-"}</td>
</tr>

              <tr>
                <th>Event Date</th>
                <td>
                  {formData.eventDate}
                </td>
              </tr>

              <tr>
                <th>Time Slot</th>
                <td>
                  {formData.eventTime}
                </td>
              </tr>

              {/* GUESTS */}

              <tr>
                <th>Total Guests</th>
                <td>
                  {formData.totalGuests}
                </td>
              </tr>

              <tr>
                <th>Male Guests</th>
                <td>
                  {formData.maleGuests}
                </td>
              </tr>

              <tr>
                <th>Female Guests</th>
                <td>
                  {formData.femaleGuests}
                </td>
              </tr>

              {/* VIP */}

              <tr>
                <th>Male VIP</th>
                <td>
                  {formData.maleVIP}
                </td>
              </tr>

              <tr>
                <th>Female VIP</th>
                <td>
                  {formData.femaleVIP}
                </td>
              </tr>

              {/* PARTITION */}

              <tr>
                <th>Separate Seating</th>
                <td>
                  {formData.partition}
                </td>
              </tr>

              {/* DECOR */}

             <tr>
  <th>Decor Package</th>

  <td>
    {isCustomDecor
      ? formData.customDecorCategory || "-"
      : selectedDecor?.title || "-"}
  </td>
</tr>

              {/* FOOD */}

              <tr>
                <th>Food Menu</th>

                <td>
                  {isCustomFood
                    ? "Create Your Own Food Menu"
                    : formData.foodName || "-"}
                </td>
              </tr>

              <tr>
                <th>Food Category</th>

                <td>
                  {isCustomFood
                    ? "Custom"
                    : formData.foodCategory || "-"}
                </td>
              </tr>

              {/* CUSTOM FOOD */}

              {isCustomFood && (
                <tr>
                  <th>Custom Food</th>

                  <td>
                    {formData.customFood || "-"}
                  </td>
                </tr>
              )}

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

      {/* SUCCESS MODAL */}

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