import {
  FaEye,
  FaCheck,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

import BookingStatusBadge from "./BookingStatusBadge";
import EmptyBookings from "./EmptyBookings";

function BookingTable({
  bookings,
  onView,
  onApprove,
  onReject,
  onDelete,
}) {
  return (
    <div className="table-responsive">

      <table className="table table-bordered table-hover align-middle">

        <thead className="table-dark">

          <tr>
            <th>Name</th>
            <th>Event</th>
            <th>Date</th>
            <th>Guests</th>
            <th>Status</th>
            <th width="260">Actions</th>
          </tr>

        </thead>

        <tbody>

          {bookings.length === 0 ? (

            <tr>

              <td colSpan="6">

                <EmptyBookings />

              </td>

            </tr>

          ) : (

            bookings.map((booking) => (

              <tr key={booking.id}>

                <td>{booking.customer_name}</td>

                <td>{booking.event_type}</td>

                <td>
                  {new Date(
                    booking.event_date
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td>{booking.guests}</td>

                <td>

                  <BookingStatusBadge
                    status={booking.booking_status}
                  />

                </td>

                <td>

                  {/* View */}

                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => onView(booking.id)}
                    title="View Booking"
                  >
                    <FaEye />
                  </button>

                  {/* Approve */}

                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => onApprove(booking.id)}
                    title="Approve Booking"
                  >
                    <FaCheck />
                  </button>

                  {/* Reject */}

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onReject(booking.id)}
                    title="Reject Booking"
                  >
                    <FaTimes />
                  </button>

                  {/* Delete */}

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(booking.id)}
                    title="Delete Booking"
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default BookingTable;