import "./RecentBookings.css";

function RecentBookings({ bookings = [] }) {

  return (

    <div className="dashboard-widget">

      <h4>Recent Bookings</h4>

      {bookings.map((booking) => (

        <div
          className="booking-item"
          key={booking.id}
        >

          <div>

            <h6>{booking.customer_name}</h6>

            <small>{booking.event_type}</small>

          </div>

          <span
            className={`status ${booking.booking_status.toLowerCase()}`}
          >

            {booking.booking_status}

          </span>

        </div>

      ))}

    </div>

  );

}

export default RecentBookings;