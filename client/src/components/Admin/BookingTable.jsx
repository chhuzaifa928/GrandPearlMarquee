import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

function BookingTable({
  bookings,
  onApprove,
  onReject,
  onDelete,
}) {
  return (
    <div className="table-responsive">

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>
            <th>Name</th>
            <th>Event</th>
            <th>Date</th>
            <th>Guests</th>
            <th>Status</th>
            <th width="220">Actions</th>
          </tr>

        </thead>

        <tbody>

          {bookings.length === 0 ? (

            <tr>
              <td colSpan="6" className="text-center">
                No bookings found.
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
                  ).toLocaleDateString()}
                </td>

                <td>{booking.guests}</td>

                <td>

                  <span
                    className={`badge ${
                      booking.booking_status === "Approved"
                        ? "bg-success"
                        : booking.booking_status === "Rejected"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {booking.booking_status}
                  </span>

                </td>

                <td>

                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() =>
                      onApprove(booking.id)
                    }
                  >
                    <FaCheck />
                  </button>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() =>
                      onReject(booking.id)
                    }
                  >
                    <FaTimes />
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      onDelete(booking.id)
                    }
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