const ImageRouter = require('express').Router();
const imageController = require('../controllers/image.controller')

ImageRouter.post('/upload', imageController.uploadImage, imageController.return_url);
module.exports = ImageRouter;