const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Hotel Room Booking management
 */

/**
 * @swagger
 * /api/bookings/:
 *   get:
 *     summary: get the list of all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Bookings listed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookingId:
 *                   type: string
 *                 hotelId:
 *                   type: number
 *                 userId:
 *                   type: number
 *                 checkInDate:
 *                   type: string
 *                 checkOutDate:
 *                   type: string
 *                 roomsBooked:
 *                   type: number
 */
router.get("/", async function (req, res) {
  try {
    const getData = await bookingController.getBookings();
    res.status(200).send(getData);
  } catch (error) {
    res.status(error.statusCode ?? 500).send(error);
  }
});

/**
 * @swagger
 * /api/bookings/bookingData:
 *   get:
 *     summary: Get booking data based on filters
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: hotelId
 *         schema:
 *           type: string
 *         description: The ID of the hotel
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - in: query
 *         name: bookingId
 *         schema:
 *           type: string
 *         description: The ID of the booking
 *     responses:
 *       200:
 *         description: Booking data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   bookingId:
 *                     type: string
 *                   hotelId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   checkInDate:
 *                     type: string
 *                     format: date
 *                   checkOutDate:
 *                     type: string
 *                     format: date
 *                   roomsBooked:
 *                     type: integer
 */
router.get("/bookingData", async function (req, res) {
  try {
    const { hotelId, userId, bookingId } = req.query;
    const query = {};

  if (hotelId) query.hotelId = hotelId;
  if (userId) query.userId = userId;
  if (bookingId) query.bookingId = bookingId;

  
    const getData = await bookingController.getBookingsByFilter(query);
    res.status(200).send(getData);
  } catch (error) {
    res.status(error.statusCode ?? 500).send(error);
  }
});

/**
 * @swagger
 * /api/bookings/book:
 *   post:
 *     summary: Create a booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelId:
 *                 type: string
 *               userId:
 *                 type: string
 *               checkInDate:
 *                 type: string
 *                 format: date
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *               roomsBooked:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookingId:
 *                   type: string
 *                 hotelId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 checkInDate:
 *                   type: string
 *                   format: date
 *                 checkOutDate:
 *                   type: string
 *                   format: date
 *                 roomsBooked:
 *                   type: integer
 */
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


/**
 * @swagger
 * /api/bookings/book:
 *   put:
 *     summary: Edit or update a booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingId:
 *                 type: string
 *               hotelId:
 *                 type: string
 *               userId:
 *                 type: string
 *               checkInDate:
 *                 type: string
 *                 format: date
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookingId:
 *                   type: string
 *                 hotelId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 checkInDate:
 *                   type: string
 *                   format: date
 *                 checkOutDate:
 *                   type: string
 *                   format: date
 */
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

/**
 * @swagger
 * /api/bookings/book/{bookingId}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the booking to delete
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
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
