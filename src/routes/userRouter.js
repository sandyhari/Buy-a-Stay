const express = require('express');
const { check } = require('express-validator');

//importing user-controller business logic handler 
const { loginUser } = require('../controller/userController');
const { registerUser } = require('../controller/userController');
const { updateUserPassword } = require('../controller/userController');

const route = express.Router();


route.post('/register', () => {
    [
        check('name', 'Please provide a name').not().isEmpty().isLength({ min: 4 }).trim(),
        check('email', 'Please provide an email').isEmail().not().isEmpty().isLength({ min: 6 }).normalizeEmail(),
        check('password', 'Password must be at least 6 character long').isLength({ min: 6 }).trim()
    ],
        registerUser
})
route.post('/login', () => {
    [
        check('email', 'Please provide an email').isEmail().not().isEmpty().isLength({ min: 6 }).normalizeEmail(),
        check('password', 'Password must be at least 6 character long').isLength({ min: 6 }).trim()
    ],
        loginUser
})
route.post('/updatePwd', () => {
    [
        check('password', 'Password must be at least 6 character long').isLength({ min: 6 }).trim()
    ],
        updateUserPassword
})
// route.post('/resetPwd', () => {
//     // [
//     //     check('password', 'Password must be at least 6 character long').isLength({ min: 6 }).trim()
//     // ],
//     resetUserPassword

// })

module.exports = route;