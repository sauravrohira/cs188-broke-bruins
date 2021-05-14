const OfferRouter = require('express').Router();
const OfferController = require('../controllers/offer.controller');

OfferRouter.post('/createOffer', OfferController.createOffer);
OfferRouter.post('/updateOffer/', OfferController.updateOffer);
OfferRouter.post('/deleteOffer/', OfferController.deleteOffer);
OfferRouter.get('/getOffer', OfferController.getOffer);
OfferRouter.get('/getAllOffers', OfferController.getAllOffers);
OfferRouter.get('/getListingOffers', OfferController.getListingOffers);
OfferRouter.get('/getUsersOfferListings', OfferController.getUsersOfferListings);

module.exports = OfferRouter; 