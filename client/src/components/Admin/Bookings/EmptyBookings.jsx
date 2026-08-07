import { FaCalendarTimes } from "react-icons/fa";

function EmptyBookings() {
  return (
    <div className="text-center py-5">

      <FaCalendarTimes
        size={60}
        className="text-secondary mb-3"
      />

      <h4>No Bookings Found</h4>

      <p className="text-muted">
        Customer bookings will appear here.
      </p>

    </div>
  );
}

export default EmptyBookings;