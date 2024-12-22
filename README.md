# Hotel Booking Backend

This is a backend application for managing hotel bookings. It provides APIs to manage hotels and bookings.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/Vasuki-shayana/Altimetric.git
cd hotel-booking-backend
```

2. Install dependencies:
```sh
npm install
```

3. Set up the database:
  - Ensure you have PostgreSQL installed and running.
  - Create a database named hotel_booking.

4. Run database migrations:
  ```sh
  node src/database/migrations/create_tables.js
  ```

## Usage

1. Start the server:
  ```sh
  npm start
  ```

2. The server will run on http://localhost:3000.

## API Endpoints
Refer the swagger documentation 
the server will run on http://localhost:3000/api-docs/

## Environment Variables
Create a .env file in the root directory and add the following:

```
PORT=3000
```

## Running Tests
To run tests, use the following command:

```
npm test
```