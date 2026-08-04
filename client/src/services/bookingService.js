import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

// Create Booking
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(API_URL, bookingData);

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      success: false,
      message: "Something went wrong.",
    };
  }
};