import axios from "axios";
import API_URL from "../config/api";

const API = `${API_URL}/api/bookings`;

const getToken = () => localStorage.getItem("token");

// =========================
// Customer
// =========================

export const createBooking = async (bookingData) => {
  const response = await axios.post(API, bookingData);

  return response.data;
};

// =========================
// Admin
// =========================

// Get All Bookings
export const getAllBookings = async () => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  

  // If backend returns { success:true, bookings:[...] }
  return response.data.bookings || response.data;
};
export const getBookingById = async (id) => {

  const response = await axios.get(`${API}/${id}`, {

    headers: {

      Authorization: `Bearer ${getToken()}`,

    },

  });

  return response.data.booking;

};
// Approve Booking
export const approveBooking = async (id) => {
  const response = await axios.put(
    `${API}/${id}`,
    {
      booking_status: "Approved",
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// Reject Booking
export const rejectBooking = async (id) => {
  const response = await axios.put(
    `${API}/${id}`,
    {
      booking_status: "Rejected",
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// Generic Status Update (optional)
export const updateBookingStatus = async (id, status) => {
  const response = await axios.put(
    `${API}/${id}`,
    {
      booking_status: status,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// Delete Booking
export const deleteBooking = async (id) => {
  const response = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};