const UserRouter = require('express').Router();
const UserController = require('../controllers/user.controller');

UserRouter.post('/signup', UserController.signup);
UserRouter.post('/login', UserController.login);
UserRouter.post('/addPicture', UserController.addPicture);
UserRouter.post('/verify', UserController.verify);

module.exports = UserRouter;