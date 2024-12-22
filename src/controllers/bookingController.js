const bookingModel = require("../models/bookingModel");
const validation = require("../helper/validation");

// Controller to get all bookings
async function getBookings() {
  const response = await bookingModel.getAllData();
  return response;
}

async function getBookingData(bookingId) {
  const response = await bookingModel.getDataByFilter({
    bookingId: bookingId,
  });
  return response;
}

// Controller to get a hotel by filter params
async function getBookingsByFilter(filter) {
  const response = await bookingModel.getDataByFilter(filter);
  return response;
}

// Controller to create a booking
async function createBooking(bookingData) {
  const validateHotel = await validation.validateHotelById(bookingData.hotelId);
  console.log("createBooking validateHotel", validateHotel);
  if (validateHotel) {
    const response = await bookingModel.createBooking(bookingData);
    return response;
  } else {
    return {
      status: false,
      message: "Invalid Hotel Id",
    };
  }
}

// Controller to create a booking
async function updateBooking(bookingData) {
  const validateHotel = await validation.validateHotelById(bookingData.hotelId);
  console.log("updateBooking validateHotel", validateHotel);
  if (validateHotel) {
    const response = await bookingModel.updateBooking(bookingData);
    return response;
  } else {
    return {
      status: false,
      message: "Invalid Hotel Id",
    };
  }
}

// Controller to cancel a booking
async function cancelBooking(bookingData) {
  const validateHotel = await validation.validateHotelById(bookingData.hotelId);
  console.log("cancelBooking validateHotel", validateHotel);
  if (validateHotel) {
    const response = await bookingModel.cancelBooking(bookingData);
    return response;
  } else {
    return {
      status: false,
      message: "Invalid Hotel Id",
    };
  }
}

async function getUserBookings(userId) {
  const response = await bookingModel.getUserBookingData(userId);
  return response;
}

module.exports = {
  getBookings,
  getBookingData,
  getBookingsByFilter,
  createBooking,
  updateBooking,
  cancelBooking,
  getUserBookings,
};
