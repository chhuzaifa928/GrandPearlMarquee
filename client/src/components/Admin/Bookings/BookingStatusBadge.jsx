function BookingStatusBadge({ status }) {
  let badgeClass = "bg-warning text-dark";

  if (status === "Approved") {
    badgeClass = "bg-success";
  }

  if (status === "Rejected") {
    badgeClass = "bg-danger";
  }

  return (
    <span className={`badge ${badgeClass}`}>
      {status}
    </span>
  );
}

export default BookingStatusBadge;