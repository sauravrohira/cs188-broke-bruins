const UserRouter = require('express').Router();
const UserController = require('../controllers/user.controller');
const {signupValidator} = require('../utils/validators')
const authorize = require('../middlewares/auth');

UserRouter.post('/signup',signupValidator, UserController.signup);
UserRouter.post('/login', UserController.login);
UserRouter.post('/addPicture', authorize, UserController.addPicture);
UserRouter.post('/verify', UserController.verify);

module.exports = UserRouter;