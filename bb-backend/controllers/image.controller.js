const imageService = require('../services/image.service')

exports.uploadImage = (req, res) => {
    try {
        imageService.upload(req, res, function (err) {
            if (err) {
                // An unknown error occurred when uploading.
                console.log(err.message);
                return res.status(400).json({message: 'Error: Only images with extension png, jpg and jpeg allowed!'});
            }
            console.log(req.file)
            return res.status(200).json({message: "Upload Successful!", url:req.file.path})
        })
    }    
    catch(err){
        console.log(err)
        return res.status(500).json({message: "Error, please try again."})
    }   
}