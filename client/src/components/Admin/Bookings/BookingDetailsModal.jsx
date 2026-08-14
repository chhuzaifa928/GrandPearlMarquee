import "./BookingDetailsModal.css";

function BookingDetailsModal({
  show,
  onClose,
  booking,
}) {
  if (!show || !booking) return null;

  // ============================================
  // PARSE EXTRA SERVICES
  // ============================================

  let selectedExtraServices = [];

  try {
    if (booking.extra_services) {
      selectedExtraServices =
        typeof booking.extra_services === "string"
          ? JSON.parse(booking.extra_services)
          : booking.extra_services;
    }
  } catch (error) {
    console.error(
      "Failed to parse extra services:",
      error
    );

    selectedExtraServices = [];
  }

  // Make sure it is always an array
  if (!Array.isArray(selectedExtraServices)) {
    selectedExtraServices = [];
  }

  return (
    <div className="modal-overlay">

      <div className="booking-modal">

        {/* ============================================
            HEADER
        ============================================ */}

        <div className="booking-modal-header">

          <h3>Booking Details</h3>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>


        {/* ============================================
            BODY
        ============================================ */}

        <div className="booking-modal-body">

          {/* ============================================
              CUSTOMER INFORMATION
          ============================================ */}

          <div className="booking-section">

            <h4>Customer Information</h4>

            <p>
              <strong>Name:</strong>{" "}
              {booking.customer_name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {booking.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {booking.phone}
            </p>

          </div>


          {/* ============================================
              EVENT INFORMATION
          ============================================ */}

          <div className="booking-section">

            <h4>Event Information</h4>

            <p>
              <strong>Event:</strong>{" "}
              {booking.event_type}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {booking.event_date}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {booking.event_time}
            </p>

          </div>


          {/* ============================================
              GUESTS
          ============================================ */}

          <div className="booking-section">

            <h4>Guests</h4>

            <p>
              <strong>Total Guests:</strong>{" "}
              {booking.guests}
            </p>

            <p>
              <strong>VIP Guests:</strong>{" "}
              {booking.vip_guests}
            </p>

            <p>
              <strong>Partition:</strong>{" "}
              {booking.partition_required
                ? "Yes"
                : "No"}
            </p>

          </div>


          {/* ============================================
              FOOD & DECOR
          ============================================ */}

          <div className="booking-section">

            <h4>Food & Decor</h4>

            <p>
              <strong>Food:</strong>{" "}
              {booking.food_category}
            </p>

            <p>
              <strong>Custom Food:</strong>{" "}
              {booking.custom_food || "None"}
            </p>

            <p>
              <strong>Decor:</strong>{" "}
              {booking.decor_theme}
            </p>

          </div>


          {/* ============================================
              EXTRA SERVICES
          ============================================ */}

          <div className="booking-section">

            <h4>Extra Services</h4>

            {selectedExtraServices.length > 0 ? (

              <div className="extra-services-list">

                {selectedExtraServices.map(
                  (service) => (

                    <p
                      key={service.id}
                      className="extra-service-item"
                    >
                      <strong>
                        {service.icon}{" "}
                        {service.title}
                      </strong>

                      {service.description && (
                        <span>
                          {" — "}
                          {service.description}
                        </span>
                      )}
                    </p>

                  )
                )}

              </div>

            ) : (

              // ========================================
              // OLD BOOKINGS FALLBACK
              // ========================================

              <>

                {booking.sound_system && (
                  <p>
                    <strong>
                      🎵 DJ / Sound System:
                    </strong>{" "}
                    Yes
                  </p>
                )}

                {booking.ac_required && (
                  <p>
                    <strong>
                      ❄️ Air Conditioning:
                    </strong>{" "}
                    Yes
                  </p>
                )}

                {booking.heater_required && (
                  <p>
                    <strong>
                      🔥 Heaters:
                    </strong>{" "}
                    Yes
                  </p>
                )}

                {!booking.sound_system &&
                  !booking.ac_required &&
                  !booking.heater_required && (
                    <p>None</p>
                  )}

              </>

            )}

          </div>


          {/* ============================================
              ADDITIONAL REQUIREMENTS
          ============================================ */}

          <div className="booking-section">

            <h4>
              Additional Requirements
            </h4>

            <p>
              {booking.additional_requirements ||
                "None"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookingDetailsModal;