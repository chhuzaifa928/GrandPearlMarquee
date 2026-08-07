function BookingFilters({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (
    <div className="row mb-4">

      <div className="col-md-8 mb-3">

        <input
          type="text"
          className="form-control"
          placeholder="Search by customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="col-md-4">

        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >

          <option value="All">All Bookings</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>

        </select>

      </div>

    </div>
  );
}

export default BookingFilters;