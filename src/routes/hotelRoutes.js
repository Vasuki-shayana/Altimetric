const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: Hotel management
 */

/**
 * @swagger
 * /api/hotels:
 *   get:
 *     summary: Get all hotels
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: A list of hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   location:
 *                     type: string
 *                   roomsAvailable:
 *                     type: integer
 */
router.get("/", async function (req, res) {
  try {
    const getData = await hotelController.getAllHotels();
    res.status(200).send(getData);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/hotels/search:
 *   get:
 *     summary: Search hotels by location or ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter hotels by location. Either `location` or `id` must be provided, but not both.
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filter hotels by ID. Either `id` or `location` must be provided, but not both.
 *     responses:
 *       200:
 *         description: A list of hotels matching the filter
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Hotel ID
 *                   name:
 *                     type: string
 *                     description: Hotel name
 *                   location:
 *                     type: string
 *                     description: Hotel location
 *                   roomsAvailable:
 *                     type: integer
 *                     description: Number of rooms available
 */
router.get("/search", async function (req, res) {
  try {
    const criteria = req.query;
    if (criteria.id || criteria.location) {
      const getData = await hotelController.getHotelByFilter(criteria);
      res.status(200).send(getData);
    } else {
      res.status(400).send({
        status: false,
        message: "Invalid search query",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/hotels/hotel:
 *   post:
 *     summary: Add a new hotel
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               roomsAvailable:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Hotel added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *                 roomsAvailable:
 *                   type: integer
 */
router.post("/hotel", async function (req, res) {
  try {
    const hotelData = req.body;
    const getData = await hotelController.addNewHotel(hotelData);
    res.status(200).send(getData);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
