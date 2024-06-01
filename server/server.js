// backend nodejs express server that interacts with react app and postgreSQL db
// dockerized in own container
const express = require('express');
const cors = require('cors');
// check is the primary function used to validate and sanitize input
// validationResult is a function of the req and is used to return an obj containing all validation errors
const { check, validationResult } = require('express-validator'); // to validate and sanitize data
const { client, createTable, getApplications, deleteUser, createApplication } = require('./db.js'); // database file
const port = process.env.PORT; // define/find PORT inside .env

const app = express()
app.use(cors());
app.use(express.json()) // allow server to receive json data
app.use(express.urlencoded({ extended: true }));

// create database table if it does not exist when server is started
createTable();

// routes
// get all stored applications
app.get('/applications', getApplications);

// validates data to correspond to database definition
const applicationValidation = [
    check('name')
        .trim()
        .isLength({ max: 100 }).withMessage('Input name must be at most 100 characters long')
        .escape(),
    check('birthdate')
        .trim()
        //.isISO8601().withMessage('Invalid date format, should be YYYY-MM-DD')
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
app.post('/apply', applicationValidation, createApplication);

app.delete('/delete/application/:id', deleteUser)

// starts express server and waits for incoming requests on the specified port
app.listen(port, () => console.log(
    `Server has started on port: ${port}`
));