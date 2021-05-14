const OfferService = require('../services/offer.services');

exports.createOffer = async (req,res) => {
    return OfferService.createOffer(req, res)
}

exports.updateOffer = async (req,res) => {
    return OfferService.updateOffer(req, res)
}

exports.deleteOffer = async (req,res) => {
    return OfferService.deleteOffer(req, res)
}

exports.getOffer = async (req,res) => {
    return OfferService.getOffer(req, res)
}

exports.getAllOffers = async (req,res) => {
    return OfferService.getAllOffers(req, res)
}

exports.getListingOffers = async (req,res) => {
    return OfferService.getListingOffers(req, res)
}