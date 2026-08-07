import {
  FaUser,
  FaCalendarAlt,
  FaUsers,
  FaEye,
  FaCheck,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

import BookingStatusBadge from "./BookingStatusBadge";

function BookingCard({
  booking,
  onView,
  onApprove,
  onReject,
  onDelete,
}) {
  return (
    <div className="card shadow-sm mb-3 border-0 rounded-4">

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center">

          <h5 className="fw-bold mb-0">
            <FaUser className="me-2 text-primary" />
            {booking.customer_name}
          </h5>

          <BookingStatusBadge
            status={booking.booking_status}
          />

        </div>

        <hr />

        <p className="mb-2">
          <FaCalendarAlt className="me-2 text-secondary" />
          <strong>Event:</strong> {booking.event_type}
        </p>

        <p className="mb-2">
          📅 <strong>Date:</strong>{" "}
          {new Date(
            booking.event_date
          ).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        <p className="mb-3">
          <FaUsers className="me-2 text-secondary" />
          <strong>Guests:</strong> {booking.guests}
        </p>

        <div className="d-grid gap-2">

          <button
            className="btn btn-primary"
            onClick={() => onView(booking)}
          >
            <FaEye className="me-2" />
            View
          </button>

          <button
            className="btn btn-success"
            onClick={() => onApprove(booking.id)}
          >
            <FaCheck className="me-2" />
            Approve
          </button>

          <button
            className="btn btn-warning"
            onClick={() => onReject(booking.id)}
          >
            <FaTimes className="me-2" />
            Reject
          </button>

          <button
            className="btn btn-danger"
            onClick={() => onDelete(booking.id)}
          >
            <FaTrash className="me-2" />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default BookingCard;