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

const getApplications = (request, response) => {
    client.query('SELECT * FROM applications ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/*
const createApplication = (request, response) => {

}
*/

/*
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('DELETE FROM applications WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
*/

module.exports = client;

// It's a good practice to close the client when you're done
//client.end();