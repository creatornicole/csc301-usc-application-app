const pg = require('pg'); // PostgreSQL Database
require('dotenv').config(); // imports and configures dotenv to access .env file
const { check, validationResult } = require('express-validator'); // to validate and sanitize data
const { convertDateFormat, convertUniAbbr } = require('./converter.js'); // to ajdust data


const { Client } = pg;

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
client.connect();

// create database table if it does not exist
const createTable = async() => {
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS applications (
                id serial PRIMARY KEY,
                name VARCHAR(100),
                birthdate DATE,
                phonenumber VARCHAR(50),
                address VARCHAR(100),
                abbr VARCHAR(50),
                course VARCHAR(100),
                seminargroup VARCHAR(25),
                position VARCHAR(100)
            )
        `);
        console.log('Table "applications" up and running!');
    } catch (err) {
        console.error('Error creating table:', err);
    }
};

// get all applications
const getApplications = (request, response) => {
    client.query('SELECT * FROM applications ORDER BY id ASC', (error, results) => {
        if (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        response.status(200).json(results.rows);
    });
}

// delete application with id
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    client.query('DELETE FROM applications WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        response.status(200).send(`Application deleted with ID: ${id}`);
    });
}

// add new application to database
const createApplication = (request, response) => {
    // gets errors according to validation
    const errors = validationResult(request);

    // respond with error code in case of invalid data
    if (!errors.isEmpty()) { // NOT WORKING PROPERLY??
        return response.status(422).json({ errors: errors.array() });
    }

    // convert date format DD/MM/YYYY to YYYY-MM-DD to safe in database
    const formattedDate = convertDateFormat(request.body.birthdate);

    // get uni abbreviation from email address (= req.body.abbr)
    const  uniAbbr = convertUniAbbr(request.body.abbr);

    const { name, phonenumber, address, course, seminargroup, position } = request.body;
    
    client.query('INSERT INTO applications (name, birthdate, phonenumber, address, abbr, course, seminargroup, position)'
    + ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [name, formattedDate, phonenumber, address, uniAbbr, course, seminargroup, position], (error, results) => {
        if (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        response.status(200).send(`Application created.`);
    });
}

module.exports = {
    client,
    createTable,
    getApplications,
    deleteUser,
    createApplication
};

// It's a good practice to close the client when you're done
//client.end();