const ImageRouter = require('express').Router();
// const ImageController = require('../controllers/image.controller');

const multer = require("multer");
const cloudinary = require("cloudinary");
const {CloudinaryStorage} = require("multer-storage-cloudinary");

cloudinary.config({
cloud_name: 'dwb7bm6hn',
api_key: '879518527386282',
api_secret: 'BFUKzk0J8GnQnK79R2rYl8FTpjk'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => 'computed-filename-using-request',
  },
});

const parser = multer({ storage: storage });

ImageRouter.post('/upload',parser.single('image'), (req, res) => {
    console.log(req) // to see what is returned to you
    const image = {};
    image.url = req.file.url;
    image.id = req.file.public_id;
    return res.status(200).json(image)
});

module.exports = ImageRouter;