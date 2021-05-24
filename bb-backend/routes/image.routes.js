const ImageRouter = require('express').Router();
const imageController = require('../controllers/image.controller')
const authorize = require('../middlewares/auth');

ImageRouter.post('/upload', authorize, imageController.uploadImage);
module.exports = ImageRouter;