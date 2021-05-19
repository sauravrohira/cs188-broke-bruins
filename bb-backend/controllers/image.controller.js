const imageService = require('../services/image.service')

exports.uploadImage = imageService.uploader.single('image')

exports.return_url = async (req, res) => {
    console.log(req.file)
    return res.status(200).json({message: "Upload Successful!", url:req.file.path})
}