import { useEffect, useState } from "react";

import BookingTable from "../../components/Admin/BookingTable";

import {
  getBookings,
  updateBookingStatus,
  deleteBooking,
} from "../../services/bookingService";

function Bookings() {

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadBookings();

  }, []);

  useEffect(() => {

    filterBookings();

  }, [search, statusFilter, bookings]);

  const loadBookings = async () => {

    try {

      const data = await getBookings();

      if (data.success) {

        setBookings(data.bookings);

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const filterBookings = () => {

    let result = [...bookings];

    if (statusFilter !== "All") {

      result = result.filter(

        booking => booking.booking_status === statusFilter

      );

    }

    if (search !== "") {

      result = result.filter(

        booking =>

          booking.customer_name
            .toLowerCase()
            .includes(search.toLowerCase())

      );

    }

    setFilteredBookings(result);

  };

  const approveBooking = async (id) => {

    try {

      await updateBookingStatus(id, "Approved");

      loadBookings();

    } catch (error) {

      console.error(error);

    }

  };

  const rejectBooking = async (id) => {

    try {

      await updateBookingStatus(id, "Rejected");

      loadBookings();

    } catch (error) {

      console.error(error);

    }

  };

  const removeBooking = async (id) => {

    const confirmDelete = window.confirm(

      "Delete this booking?"

    );

    if (!confirmDelete) return;

    try {

      await deleteBooking(id);

      loadBookings();

    } catch (error) {

      console.error(error);

    }

  };

  if (loading) {

    return (

      <div className="text-center mt-5">

        <div className="spinner-border text-primary"></div>

      </div>

    );

  }

  return (

    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>

          Bookings Management

        </h2>

      </div>

      <div className="row mb-3">

        <div className="col-md-6">

          <input
            type="text"
            className="form-control"
            placeholder="Search Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="col-md-3">

          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >

            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>

          </select>

        </div>

      </div>

      <BookingTable

        bookings={filteredBookings}

        onApprove={approveBooking}

        onReject={rejectBooking}

        onDelete={removeBooking}

      />

    </div>

  );

}

export default Bookings;