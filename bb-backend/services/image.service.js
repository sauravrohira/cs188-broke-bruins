const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dwb7bm6hn', 
    api_key: '879518527386282', 
    api_secret: 'BFUKzk0J8GnQnK79R2rYl8FTpjk' 
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: '/uploads',
  },
});

const uploader = multer({storage:storage, limits:{
    fileSize: 1000 * 1000 * 20,
    fields: 100,
    files: 100,
    parts: 100
}});

module.exports = {uploader}