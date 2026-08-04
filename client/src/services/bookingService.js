import axios from "axios";

const API = "http://localhost:5000/api/bookings";

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

export const getBookings = async () => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

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

export const deleteBooking = async (id) => {
  const response = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};