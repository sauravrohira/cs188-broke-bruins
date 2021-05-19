const RentalService = require('../services/rental.service');

exports.createListing = async (req,res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(422).json({ errors: errors.array() });
	}

    return RentalService.createListing(req, res)
}

exports.updateListing = async (req,res) => {
    return RentalService.updateListing(req, res)
}

exports.deleteListing = async (req,res) => {
    return RentalService.deleteListing(req, res)
}

exports.getUserListings = async (req,res) => {
    return RentalService.getUserListings(req, res)
}

exports.getListing = async (req,res) => {
    return RentalService.getListing(req, res)
}

exports.getAllListings = async (req,res) => {
    return RentalService.getAllListings(req, res)
}