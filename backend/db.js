const { Client } = require('pg');

// PostgreSQL connection settings without a password
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'lumaachallenge',
  password:'test',
  database: 'lumaa',
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

module.exports = client;
