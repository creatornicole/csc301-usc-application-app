// backend nodejs express server that interacts with react app and postgreSQL db
// dockerized in own container
const express = require('express');
const cors = require('cors');
const client = require('./db.js'); // database file
const port = process.env.PORT; // define/find PORT inside .env

const app = express()
app.use(cors());
app.use(express.json()) // allow server to receive json data
app.use(express.urlencoded({ extended: true }));

// create database table if it does not exist when server is started
const createTable = async() => {
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS applications (
                id serial PRIMARY KEY,
                name VARCHAR(100),
                birthdate DATE,
                phonenumber VARCHAR(50),
                address VARCHAR(100),
                abbr VARCHAR(25),
                course VARCHAR(100),
                seminargroup VARCHAR(25),
                
                const VARCHAR(50)
            )
        `);
        console.log('Table "applications" up and running!');
    } catch (err) {
        console.log('Error creating table:', err);
    }
};
createTable();

// routes
// test route to get all stored applications
app.get('/applications', async (req, res) => {
    try {
        const data = await client.query('SELECT * FROM applications')
        if (data) {
            res.status(200).send(data.rows)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error');
    }
})

// test route to store new application
app.post('/apply', async (req, res) => {
    // TODO: add data validation to prevent SQL injection attacks
    // validate and sanitize user input before using
    // use paramterized queries or an ORM (Object-Relational Mapping)
    // -> see course material
    const { name, birthdate, phonenumber, address, abbr, course, seminargroup, position } = req.body
    console.log(req.body);
    try {
        await client.query('INSERT INTO applications (name, birthdate, phonenumber, address, abbr, course, seminargroup, position)'
            + ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
            [name, birthdate, phonenumber, address, abbr, course, seminargroup, position]);
        res.status(200).send('Successfully added child!');
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error');
    }
})

// test route to delete everything from the 'applications' table
app.delete('/delete', async (req, res) => {
    try {
        await client.query('DELETE FROM applications')
        res.status(200).send('Successfully deleted everything from table!');
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error');
    }
})

// starts express server and waits for incoming requests on the specified port
app.listen(port, () => console.log(
    `Server has started on port: ${port}`
))
