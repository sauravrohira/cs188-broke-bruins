const bcrypt = require('bcrypt');
const user = require('../models/user');
const userServices = require('../services/user.services')

exports.signup = async (req,res) => {
    console.log("here!");
    let { username, email, password, primaryComm, primaryDetails } = req.body

    // use client side validation and send non-empty username/email/password to backend
    if (password.length < 8) {
        return res.status(400).json({
            error: 'Invalid password. Must have at least 8 characters.'
        })
    }

    //check email for ucla.edu
    if(! email.match(/.{1,}@(g.)?ucla\.edu$/)){
        return res.status(400).json({
            error: 'ucla.edu email required.'
        })
    }

    //hash password before storing it
    password = await bcrypt.hash(password, 10);

    //add user to db
    try {
        const addedUser = await userServices.createUser(username, password, email, primaryComm, primaryDetails)
        return res.status(200).json({
            message: 'Signup Successful!',
            id: addedUser.id
        })
    }
    catch(err) {
        if (err.message.includes('duplicate') && err.message.includes('username')) {
            return res.status(400).json({
                error: 'Username taken. Create a different username.'
            })
        } else if (err.message.includes('duplicate') && err.message.includes('email')) {
            return res.status(400).json({
                error: 'Email already in use. Use a different one.'
            })
        }
        console.log(err);
        return res.status(500).json({
            error: 'Signup Error. Try resubmitting the form.'
        })
    }   
}

exports.login = async (req,res) => {
    const {email, password} = req.body

    let user
    try {
        user = await userServices.fetchUser(email)
        if(!user){
            return res.status(401).json({ message: "Invalid Username or Password" })
        }
    }
    catch(err){
        console.log(err)
        return res.status(400).json({message: "Error Logging In!"})
    }

    let hashedPassword = user.password
    let result = await bcrypt.compare(password, hashedPassword)
    if (!result) {
        return res.status(401).json({ message: "Invalid Username or Password" })
    }

    return res.status(200).json({
        message: 'Login successful',
        id: user.id,
        username: user.username,
        email: user.email,
        primaryComm: user.primary_communication_method,
        primaryDetails: user.primary_communication_details,
        secondaryComm: user.secondary_communication_method,
        secondaryDetails: user.secondary_communication_details,
    })
}

exports.addPicture = async (req, res) => {
    const {userId, imageUrl} = req.body

    try{
        await userServices.addUserPicture(userId, imageUrl);
        return res.status(200).json({message: "Upload Successful!"});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({message: "Something Failed. Try again."});
    }
}