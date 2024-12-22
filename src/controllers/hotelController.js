const hotelModel = require("../models/hotelModel");

// Controller to get all hotels
async function getAllHotels() {
  const response = await hotelModel.getAllData();
  return response;
}

// Controller to get a hotel by filter params
async function getHotelByFilter(filter) {
  const response = await hotelModel.getDataByFilter(filter);
  return response;
}

async function addNewHotel(data){
  const response = await hotelModel.addNewRecord(data);
  return response;
}

module.exports = {
  getAllHotels,
  getHotelByFilter,
  addNewHotel
};
