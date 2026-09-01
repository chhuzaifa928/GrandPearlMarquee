import apiClient from "./apiClient";
import API_URL from "../config/api";

const API = `${API_URL}/api/bookings`;

// =========================
// Customer
// =========================

export const createBooking = async (bookingData) => {
  const response = await apiClient.post(API, bookingData);

  return response.data;
};

// =========================
// Admin
// =========================

// Get All Bookings
export const getAllBookings = async () => {
  const response = await apiClient.get(API);

  // If backend returns { success:true, bookings:[...] }
  return response.data.bookings || response.data;
};
export const getBookingById = async (id) => {
  const response = await apiClient.get(`${API}/${id}`);

  return response.data.booking;
};
// Approve Booking
export const approveBooking = async (id) => {
  const response = await apiClient.put(
    `${API}/${id}`,
    {
      booking_status: "Approved",
    }
  );

  return response.data;
};

// Reject Booking
export const rejectBooking = async (id) => {
  const response = await apiClient.put(
    `${API}/${id}`,
    {
      booking_status: "Rejected",
    }
  );

  return response.data;
};

// Generic Status Update (optional)
export const updateBookingStatus = async (id, status) => {
  const response = await apiClient.put(
    `${API}/${id}`,
    {
      booking_status: status,
    }
  );

  return response.data;
};

// Delete Booking
export const deleteBooking = async (id) => {
  const response = await apiClient.delete(`${API}/${id}`);

  return response.data;
};
