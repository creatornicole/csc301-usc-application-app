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
// TODO: PREVENT SQL INJECTION, make sure that characters are not more than defined in the db definition
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

// Validation Array
var loginValidate = [
  // Check Username
  check('username', 'Username Must Be an Email Address').isEmail()
  .trim().escape().normalizeEmail(),
  // Check Password
  check('password').isLength({ min: 8 }).withMessage('Password Must Be at Least 8 Characters').matches('[0-9]').withMessage('Password Must Contain a Number').matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').trim().escape()];



app.post('/login', loginValidate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
  	return res.status(422).json({ errors: errors.array() });
  }
  else {
  // Insert Login Code Here
  let username = req.body.username;
  let password = req.body.password;
  res.send(`Username: ${username} Password: ${password}`);  }
});