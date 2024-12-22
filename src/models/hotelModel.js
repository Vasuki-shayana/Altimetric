var hotels = require("../database/hotels.json");

// Get all data from the table
async function getAllData() {
  return new Promise((resolve, reject) => {
    hotels.length > 0
      ? resolve(hotels)
      : reject({
          status: false,
          message: "NO data",
        });
  });
}

// filter data from the table by search params
async function getDataByFilter(filter) {
  console.log("getDataByFilter filter", filter);
  return new Promise((resolve, reject) => {
    const filterDataById = hotels.filter((data) => {
      if (filter.id) {
        return data.id == filter.id;
      } else if (filter.location) {
        return data.location == filter.location;
      }
    });
    console.log("getDataByFilter filterDataById", filterDataById);
    filterDataById.length > 0 ? resolve(filterDataById) : reject({
      status: false,
      message: "NO data"
    });
  });
}

async function addNewRecord(hotelData) {
  return new Promise(async (resolve, reject) => {
    try {
      let results = {};
      for (const data of hotelData) {
        if (hotelData.hotelId !== data.id) {
          const res = await addObjectToJsonFile({
            id: data.id,
            name: data.name,
            location: data.location,
            roomsAvailable: data.roomsAvailable,
          });
          results = res;
        } else {
          reject({
            status: false,
            message: "Hotel already exist",
          });
        }
      }
      resolve(results);
    } catch (error) {
      reject({
        status: false,
        message: `Internal Server Error: ${error}`,
      });
    }
  });
}

async function addObjectToJsonFile(newObject) {
  try {
    const filePath = path.join(__dirname, "../database/hotels.json");
    // Read the existing JSON file
    const fileData = await fs.promises.readFile(filePath, "utf8");

    // Parse JSON data to an array
    const data = JSON.parse(fileData);

    // Add the new object to the array
    data.push(newObject);

    // Write the updated array back to the file
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      "utf8"
    );

    return {
      status: true,
      message: "Hotel Added successfully",
    };
  } catch (error) {
    console.error("Error updating the JSON file:", error);
    return {
      status: false,
      message: "Operation failed",
    };
  }
}

module.exports = { getAllData, getDataByFilter, addNewRecord };
