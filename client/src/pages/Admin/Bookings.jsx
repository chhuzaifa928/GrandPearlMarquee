import { useEffect, useState } from "react";

import BookingTable from "../../components/Admin/Bookings/BookingTable";
import BookingCard from "../../components/Admin/Bookings/BookingCard";
import BookingFilters from "../../components/Admin/Bookings/BookingFilters";
import BookingDetailsModal from "../../components/Admin/Bookings/BookingDetailsModal";

import {
  getAllBookings,
  getBookingById,
  approveBooking,
  rejectBooking,
  deleteBooking,
} from "../../services/bookingService";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    let result = [...bookings];

    if (status !== "All") {
      result = result.filter(
        (booking) => booking.booking_status === status
      );
    }

    if (search.trim() !== "") {
      result = result.filter((booking) =>
        booking.customer_name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    setFilteredBookings(result);
  }, [search, status, bookings]);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const data = await getAllBookings();

      console.log("Bookings:", data);

      setBookings(data);
      setFilteredBookings(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id) => {
    try {
      const booking = await getBookingById(id);

      setSelectedBooking(booking);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveBooking(id);
      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectBooking(id);
      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await deleteBooking(id);
      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">

      <h2 className="mb-4 fw-bold">
        Bookings Management
      </h2>

      <BookingFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {loading ? (
        <div className="text-center py-5">
          <div
            className="spinner-border text-warning"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="d-none d-lg-block">
            <BookingTable
              bookings={filteredBookings}
              onView={handleView}
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
            />
          </div>

          {/* Mobile */}
          <div className="d-lg-none">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onView={handleView}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}

      <BookingDetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        booking={selectedBooking}
      />
    </div>
  );
}

export default Bookings;