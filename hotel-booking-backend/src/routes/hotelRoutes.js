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
 *   post:
 *     summary: Search hotels by location
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: A list of hotels matching the location
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
router.post("/search", async function (req, res) {
  try {
    const criteria = req.body;
    const getData = await hotelController.getHotelByFilter(criteria);
    res.status(200).send(getData);
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
