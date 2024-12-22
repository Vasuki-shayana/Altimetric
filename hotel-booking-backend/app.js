const express = require("express");
const path = require("path");
const app = express();
var bodyParser = require('body-parser')
const cors = require("cors");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
const hotelRoutes = require("./src/routes/hotelRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");

// Serve static files (if you want to serve other assets like JS, CSS, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Serve the booking.html file
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "views", "booking.html");
  res.sendFile(filePath);
});

// Use API routes
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
