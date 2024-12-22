const { Client } = require('pg');

// Database connection configuration
const client = new Client({
  host: 'localhost',      // PostgreSQL server host
  port: 5432,             // Default port for PostgreSQL
  user: 'postgres',       
  password: 'postgres',
  database: 'hotel_booking' 
});

// Connect to the database
async function connect() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
    return client; 
  } catch (err) {
    console.error('Connection error', err.stack);
  }
}

// Close the database connection
async function endConnection() {
    try {
      await client.end();
      console.log('Disconnected from PostgreSQL');
      return client; 
    } catch (err) {
      console.error('Connection error', err.stack);
    }
  }

module.exports = { connect, endConnection };
