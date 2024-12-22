const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Route to get all bookings
router.get("/", async function (req, res) {
  try {
    const getData = await bookingController.getBookings();
    res.status(200).send(getData);
  } catch (error) {
    res.status(error.statusCode ?? 500).send(error);
  }
});

// Route to get the booking details by search param
router.get("/bookingData", async function (req, res) {
  console.log('req.query', req.query);
  try {
    const { hotelId, userId, bookingId } = req.query;
    const query = {};

  // Add conditions to the query object based on the received query parameters
  if (hotelId) query.hotelId = hotelId;
  if (userId) query.userId = userId;
  if (bookingId) query.bookingId = bookingId;

  
    const getData = await bookingController.getBookingsByFilter(query);
    res.status(200).send(getData);
  } catch (error) {
    res.status(error.statusCode ?? 500).send(error);
  }
});

// Route to create a booking
router.post("/book", async function (req, res) {
  try {
    const bookingData = {
      hotelId: req.body.hotelId,
      userId: req.body.userId,
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
      roomsBooked: req.body.roomsBooked,
    };

    const getData = await bookingController.createBooking(bookingData);
    res.status(200).send(getData);
  } catch (error) {
    res.status(error.statusCode ?? 500).send(error);
  }
});

// Route to edit or update a booking
router.put("/book", async function (req, res) {
  try {
    const bookingData = {
      bookingId: req.body.bookingId,
      hotelId: req.body.hotelId,
      userId: req.body.userId,
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
    };

    const getData = await bookingController.updateBooking(bookingData);
    res.status(200).send(getData);
  } catch (error) {
    res.status(error.statusCode ?? 500).send(error);
  }
});

// Route to cancel a booking
router.delete("/book/:bookingId", async function (req, res) {
  try {
    const getData = await bookingController.cancelBooking({
      bookingId: req.params.bookingId,
    });
    res.status(200).send(getData);
  } catch (error) {
    res.status(error.statusCode ?? 500).send(error);
  }
});

module.exports = router;
