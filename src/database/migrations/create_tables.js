const { connect, endConnection } = require('../connection');

const createHotelsTable = `
  CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    rooms_available INT NOT NULL
  );
`;

const createRoomsTable = `
  CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    hotel_id INT REFERENCES hotels(id) ON DELETE CASCADE,
    room_number VARCHAR(255) NOT NULL,
    room_type VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL
  );
`;

const createBookingsTable = `
  CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    room_id INT REFERENCES rooms(id) ON DELETE CASCADE,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    booking_status VARCHAR(50) DEFAULT 'pending' 
  );
`;

async function runMigration() {
    const client = await connect();
    try {
    console.log('Running migration...');

    await client.query(createHotelsTable);
    console.log('Created hotels table.');

    await client.query(createRoomsTable);
    console.log('Created rooms table.');

    await client.query(createBookingsTable);
    console.log('Created bookings table.');

    } catch (err) {
    console.error('Error running migration:', err);
    } finally {
    await endConnection();  
    }
}

runMigration();