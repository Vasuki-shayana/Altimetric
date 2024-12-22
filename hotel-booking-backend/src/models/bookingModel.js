var bookings = require("../database/bookings.json");
var hotels = require("../database/hotels.json");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Get all data from the table
async function getAllData() {
  return new Promise((resolve, reject) => {
    bookings.length > 0 ? resolve(bookings) : reject({
      status: false,
      statusCode: 404,
      message: "NO data",
    });
  });
}

// filter data from the table by search params
async function getDataByFilter(filter) {
  console.log('filter', filter)
  return new Promise((resolve, reject) => {
    const filterDataById = bookings.filter((data) => {
      if (filter.hotelId) {
        return data.hotelId == filter.hotelId;
      } else if (filter.bookingId) {
        return data.bookingId == filter.bookingId;
      } else if (filter.userId) {
        return data.userId == filter.userId;
      }
    });
    filterDataById.length > 0 ? resolve(filterDataById) : reject({
      status: false,
      statusCode: 404,
      message: "NO data",
    });
  });
}

// add new entry to the bookings json
async function createBooking(bookingData) {
  return new Promise(async (resolve, reject) => {
    try {
      let results = {};
      for (const data of hotels) {
        if (parseInt(bookingData.hotelId) === data.id) {
          if (data.roomsAvailable > 1) {
            const res = await manageJsonFile("add", {
              bookingId: uuidv4(),
              hotelId: bookingData.hotelId,
              userId: bookingData.userId,
              checkInDate: bookingData.checkInDate,
              checkOutDate: bookingData.checkOutDate,
              roomsBooked: bookingData.roomsBooked,
            });
          results = res;
          } else {
            reject({
              status: false,
              statusCode: 404,
              message: "no rooms available",
            });
          }
        }
      }      
      resolve(results);
    } catch (error) {
      reject(
        {
          status: false,
          statusCode: 404,
          message: `Internal Server Error: ${error}`,
        },
      );
    }
  });
}

// remove entry from the bookings json
async function cancelBooking(bookingData) {
  return new Promise(async (resolve, reject) => {
    try {
      let results = {};
      for (const data of bookings) {
        if (bookingData.bookingId === data.bookingId) {
          const res = await manageJsonFile("remove", bookingData);
          results = res;
        }
      }
      resolve(results);
    } catch (error) {
      reject({
        status: false,
        statusCode: 404,
        message: "Internal Server Error",
      });
    }
  });
}

// update entry from the bookings json
async function updateBooking(bookingData) {
  return new Promise(async (resolve, reject) => {
    try {
      let results = {};
      for (const data of bookings) {
        if (bookingData.bookingId === data.bookingId) {
          const updatedBookingData = {
            bookingId: data.bookingId,
            hotelId: data.hotelId,
            userId: data.userId,
            checkInDate: bookingData.checkInDate,
            checkOutDate: bookingData.checkOutDate,
          };
          const res = await manageJsonFile("update", updatedBookingData);
          results = res;
        }
      }
      resolve(results);
    } catch (error) {
      reject(
        {
          status: false,
          statusCode: 404,
          message: "Internal Server Error",
        },
      );
    }
  });
}

// helper function to modify the json data
async function manageJsonFile(action, object) {
  try {
    const filePath = path.join(__dirname, "../database/bookings.json");
    // Read the existing JSON file
    const fileData = await fs.promises.readFile(filePath, "utf8");
    const data = JSON.parse(fileData); // Parse JSON data to an array

    switch (action) {
      case "add":
        data.push(object); // Add the new object
        break;

      case "remove": {
        const index = data.findIndex(
          (booking) => booking.bookingId === object.bookingId
        );
        if (index !== -1) {
          data.splice(index, 1); // Remove the object at the found index
        } else {
          return {
            status: false,
            statusCode: 404,
            message: "Booking not found to remove",
          };
        }
        break;
      }

      case "update": {
        const index = data.findIndex(
          (booking) => booking.bookingId === object.bookingId
        );
        if (index !== -1) {
          data[index] = { ...data[index], ...object }; // Update the object at the found index
        } else {
          return {
            status: false,
            statusCode: 404,
            message: "Booking not found to update",
          };
        }
        break;
      }

      default:
        return {
          status: false,
          statusCode: 400,
          message: "Invalid action. Use 'add', 'remove', or 'update'.",
        };
    }

    console.log('data', data);
    // Write the updated array back to the file
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      "utf8"
    );

    return {
      status: true,
      message: `Booking ${action} completed successfully`,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: 400,
      message: "Operation failed",
    };
  }
}

async function getUserBookingData(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      let results = [];
      for (const data of bookings) {
        if (userId === data.userId) {
          results.push(data);
        }
      }
      resolve(results);
    } catch (error) {
      reject([
        {
          status: false,
          statusCode: 500,
          message: "Internal Server Error",
        },
      ]);
    }
  });
}

module.exports = {
  getAllData,
  getDataByFilter,
  createBooking,
  cancelBooking,
  updateBooking,
  getUserBookingData,
};
