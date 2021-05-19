const RentalService = require('../services/rental.service');

exports.createListing = async (req,res) => {
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

exports.getOffersOnListing = async (req,res) => {
    return RentalService.getOffersOnListing(req, res)
}

exports.getAllButUserListings = async (req,res) => {
    return RentalService.getAllButUserListings(req, res)
}

exports.getListing = async (req,res) => {
    return RentalService.getListing(req, res)
}

exports.getAllListings = async (req,res) => {
    return RentalService.getAllListings(req, res)
}