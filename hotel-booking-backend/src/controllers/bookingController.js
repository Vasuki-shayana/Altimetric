const bookingModel = require("../models/bookingModel");

// Controller to get all bookings
async function getBookings() {
  const response = await bookingModel.getAllData();
  return response;
}

async function getBookingData(bookingId){
  const response = await bookingModel.getDataByFilter({
    bookingId: bookingId
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
  const response = await bookingModel.createBooking(bookingData);
  return response;
}

// Controller to create a booking
async function updateBooking(bookingData) {
  const response = await bookingModel.updateBooking(bookingData);
  return response;
}

// Controller to cancel a booking
async function cancelBooking(bookingData) {
  const response = await bookingModel.cancelBooking(bookingData);
  return response;
}

async function getUserBookings(userId){
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
  getUserBookings
};
