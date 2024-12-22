const hotelModel = require("../models/hotelModel");

async function validateHotelById(hotelId) {
  console.log("validateHotel hotelId", hotelId);
  let getHotelDetails = []
  try {
    getHotelDetails = await hotelModel.getDataByFilter({ id: hotelId });
    console.log("getHotelDetails", getHotelDetails);
  } catch (error) {
    getHotelDetails = []
  }

  if (getHotelDetails.length > 0) {
    return true;
  } else {
    return false;
  }
}

async function updateRoomsAvailabilty(operation,hotelId, roomsBooked){
    console.log('hotelId', hotelId)
    try {
        await hotelModel.updateRoomAvailabilty(operation,hotelId, roomsBooked);
      } catch (error) {
        console.log(error)
      }
}

module.exports = { validateHotelById,updateRoomsAvailabilty };
