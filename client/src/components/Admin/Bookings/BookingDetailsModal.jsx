import "./BookingDetailsModal.css";

function BookingDetailsModal({
  show,
  onClose,
  booking,
}) {
  if (!show || !booking) return null;

  return (
    <div className="modal-overlay">

      <div className="booking-modal">

        <div className="booking-modal-header">

          <h3>Booking Details</h3>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="booking-modal-body">

          <div className="booking-section">

            <h4>Customer Information</h4>

            <p><strong>Name:</strong> {booking.customer_name}</p>

            <p><strong>Email:</strong> {booking.email}</p>

            <p><strong>Phone:</strong> {booking.phone}</p>

          </div>

          <div className="booking-section">

            <h4>Event Information</h4>

            <p><strong>Event:</strong> {booking.event_type}</p>

            <p><strong>Date:</strong> {booking.event_date}</p>

            <p><strong>Time:</strong> {booking.event_time}</p>

          </div>

          <div className="booking-section">

            <h4>Guests</h4>

            <p><strong>Total Guests:</strong> {booking.guests}</p>

            <p><strong>VIP Guests:</strong> {booking.vip_guests}</p>

            <p><strong>Partition:</strong> {booking.partition_required}</p>

          </div>

          <div className="booking-section">

            <h4>Food & Decor</h4>

            <p><strong>Food:</strong> {booking.food_category}</p>

            <p><strong>Custom Food:</strong> {booking.custom_food || "None"}</p>

            <p><strong>Decor:</strong> {booking.decor_theme}</p>

          </div>

          <div className="booking-section">

            <h4>Extra Services</h4>

            <p><strong>Sound System:</strong> {booking.sound_system ? "Yes" : "No"}</p>

            <p><strong>AC:</strong> {booking.ac_required ? "Yes" : "No"}</p>

            <p><strong>Heater:</strong> {booking.heater_required ? "Yes" : "No"}</p>

          </div>

          <div className="booking-section">

            <h4>Additional Requirements</h4>

            <p>{booking.additional_requirements || "None"}</p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookingDetailsModal;