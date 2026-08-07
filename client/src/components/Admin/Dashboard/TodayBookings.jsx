import "./TodayBookings.css";

function TodayBookings({ bookings = [] }) {

  return (

    <div className="dashboard-widget">

      <h4>Today's Bookings</h4>

      {bookings.length === 0 ? (

        <p className="empty-widget">
          No bookings for today.
        </p>

      ) : (

        bookings.map((booking) => (

          <div
            className="booking-item"
            key={booking.id}
          >

            <div>

              <h6>{booking.customer_name}</h6>

              <small>{booking.event_type}</small>

            </div>

            <span className="status pending">

              {booking.booking_status}

            </span>

          </div>

        ))

      )}

    </div>

  );

}

export default TodayBookings;