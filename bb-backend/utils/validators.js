const { check } = require('express-validator')

exports.signupValidator = [
    check('username').isLength({min:5}).withMessage('Username must be atleast 5 characters.')
    .trim().escape(),
    check('email').isEmail().not().isEmpty()
    .matches(/.{1,}@(g.)?ucla\.edu$/).withMessage('Email must be a valid UCLA address.')
    .trim().escape().normalizeEmail(),
    check('password').isLength({min:8}).withMessage('Password must be atleast 8 characters.')
    .matches('[0-9]').withMessage('Password Must Contain a Number.')
    .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter.'),
    check('primaryComm').not().isEmpty().trim().escape(),
    check('primaryDetails').not().isEmpty().trim().escape(),
]

exports.createListingValidator = [ 
    check('userId').isNumeric().not().isEmpty(),
    check('sellerId').isNumeric().not().isEmpty(),
    check('title').not().isEmpty().trim().escape(),
    check('price').not().isEmpty().isNumeric(),
    check('description').trim().escape(),
    check('imageUrl').isURL(),
]