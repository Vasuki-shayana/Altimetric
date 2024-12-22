const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

// Route to get all hotels
router.get("/", async function (req, res) {
  try {
    const getData = await hotelController.getAllHotels();
    res.status(200).send(getData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to get a hotel by search param
router.post("/search", async function (req, res) {
  try {
    const criteria = req.body;
    const getData = await hotelController.getHotelByFilter(criteria);
    res.status(200).send(getData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to add a new hotel
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
