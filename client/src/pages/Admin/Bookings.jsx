import { useMemo, useState } from "react";

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

import useFetch from "../../hooks/useFetch";
import { useToast } from "../../hooks/useToast";
import { useConfirm } from "../../hooks/useConfirm";

function Bookings() {
  const toast = useToast();
  const confirm = useConfirm();

  const {
    data: bookingsData,
    loading,
    refetch,
  } = useFetch(getAllBookings, { showLoadingOnRefetch: true });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredBookings = useMemo(() => {
    let result = [...(bookingsData ?? [])];

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

    return result;
  }, [search, status, bookingsData]);

 const handleView = async (id) => {
  try {
    const booking = await getBookingById(id);

    setSelectedBooking(booking);
    setShowModal(true);

  } catch (error) {
    console.error("VIEW BOOKING ERROR:", error);
    console.error("SERVER RESPONSE:", error.response?.data);
  }
};

  const handleApprove = async (id) => {
    try {
      await approveBooking(id);
      toast.success("Booking approved.");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve booking.");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectBooking(id);
      toast.success("Booking rejected.");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to reject booking.");
    }
  };

  const handleDelete = async (id) => {
    const ok = await confirm({
      title: "Delete booking?",
      message: "Are you sure you want to delete this booking?",
    });

    if (!ok) return;

    try {
      await deleteBooking(id);
      toast.success("Booking deleted.");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete booking.");
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