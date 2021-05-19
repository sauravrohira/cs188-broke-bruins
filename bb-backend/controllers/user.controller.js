const bcrypt = require('bcrypt');
const user = require('../models/user');
const userServices = require('../services/user.services');
var tokenGen = require('generate-sms-verification-code');
const emailService = require('../services/emailService');
const sequelize = require('../services/db');
const {validationResult} = require('express-validator');

exports.signup = async (req,res) => {
    
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(422).json({ errors: errors.array() });
	}

    let { username, email, password, primaryComm, primaryDetails } = req.body

    //hash password before storing it
    password = await bcrypt.hash(password, 10);

    const secretCode = tokenGen(6, {type:'number'})

    //add user to db
    try {
        const addedUser = await userServices.createUser(username, password, email, primaryComm, primaryDetails, secretCode)
        const data = {
            from: `Broke Bruins <brokebruins@gmail.com>`,
            to: addedUser.email,
            subject: "Your Activation Code for Broke Bruins",
            text: `Please use the following code to activate your account on Broke Bruins: ${secretCode}`,
            html: `<p>Please use the following code to activate your account on Broke Bruins: ${secretCode}</p>`,
        };
        await emailService.sendMail(data)
        return res.status(200).json({
            message: 'Signup Successful!',
            id: addedUser.id
        })
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            error: 'Signup Error. Try resubmitting the form. If you are an existing user, please use the Login Form instead.'
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

    if(! user.verified){
        return res.status(401).json({message: "User email not verified!"})
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

exports.verify = async (req,res) => {
    const userModel = sequelize.models.user
    const {email, code} = req.body
    const checkUser = await userServices.fetchUser(email)
    if(checkUser.secretCode == code) {
        const [rows, [User]] = await userModel.update({
            verified: true
        }, { returning: true, where: { id: checkUser.id } });
        res.status(200).json({ message: "The code matched! User verified!" })
    } 
    else {
        res.status(401).json({ message: "The code does not match!" })
    }
}