const pg = require('pg'); // PostgreSQL Database
require('dotenv').config(); // imports and configures dotenv to access .env file

const { Client } = pg;

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
client.connect();

module.exports = client;

// It's a good practice to close the client when you're done
//client.end();