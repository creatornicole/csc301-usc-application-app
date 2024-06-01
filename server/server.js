// backend nodejs express server that interacts with react app and postgreSQL db
// dockerized in own container
const express = require('express');
const cors = require('cors');
// check is the primary function used to validate and sanitize input
// validationResult is a function of the req and is used to return an obj containing all validation errors
const { check, validationResult } = require('express-validator'); // to validate and sanitize data
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
createTable();

// routes
// get all stored applications
app.get('/applications', async (req, res) => {
    try {
        const data = await client.query('SELECT * FROM applications') 
        if (data) {
            res.status(200).send(data.rows)
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error');
    }
})

// validates data to correspond to database definition
const applicationValidation = [
    check('name')
        .trim()
        .isLength({ max: 100 }).withMessage('Input name must be at most 100 characters long')
        .escape(),
    check('birthdate')
        .trim()
        .isISO8601().withMessage('Invalid date format, should be YYYY-MM-DD')
        .escape(),
    check('phonenumber')
        .trim()
        .isLength({ max: 50 }).withMessage('Input phonenumber must be at most 50 characters long')
        .escape(),
    check('address')
        .trim()
        .isLength({ max: 100 }).withMessage('Input address must be at most 100 characters long')
        .escape(),
    check('abbr') // is university mail address
        .trim()
        .isEmail().withMessage('Invalid email address')
        .isLength({ max: 50 }).withMessage('Input abbr must be at most 50 characters long')
        .normalizeEmail(),
    check('course')
        .trim()
        .isLength({ max: 100 }).withMessage('Input course must be at most 100 characters long')
        .escape(),
    check('seminargroup')
        .trim()
        .isLength({ max: 25 }).withMessage('Input seminargroup must be at most 25 characters long')
        .escape(),
    check('position')
        .trim()
        .isLength({ max: 100 }).withMessage('Input position must be at most 100 characters long')
        .escape(),
];

// test route to store new application
app.post('/apply', applicationValidation, async (req, res) => {
    // TODO: abbr -> get first part

    // gets errors according to validation
    const errors = validationResult(req);

    // respond with error code in case of invalid data
    if (!errors.isEmpty()) { // NOT WORKING PROPERLY??
        return res.status(422).json({ errors: errors.array() });
    }

    const { name, birthdate, phonenumber, address, abbr, course, seminargroup, position } = req.body
    
    try {
        // parameterized queries to prevent sql injection
        await client.query('INSERT INTO applications (name, birthdate, phonenumber, address, abbr, course, seminargroup, position)'
            + ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
            [name, birthdate, phonenumber, address, abbr, course, seminargroup, position]);
        res.status(200).send('Successfully added application!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/delete/application/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await client.query('DELETE FROM applications WHERE id = $1', [id]); 
        res.status(200).send('User deleted successfully.');
    } catch (err) {
        console.error('Error deleting application: ', err);
        res.status(500).send('Internal Server Error');
    }
})

// starts express server and waits for incoming requests on the specified port
app.listen(port, () => console.log(
    `Server has started on port: ${port}`
));