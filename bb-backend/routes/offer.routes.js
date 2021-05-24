const OfferRouter = require('express').Router();
const OfferController = require('../controllers/offer.controller');
const authorize = require('../middlewares/auth');

OfferRouter.post('/createOffer', authorize, OfferController.createOffer);
OfferRouter.post('/updateOffer/', authorize, OfferController.updateOffer);
OfferRouter.post('/deleteOffer/', authorize, OfferController.deleteOffer);
OfferRouter.get('/getOffer', authorize, OfferController.getOffer);
OfferRouter.get('/getAllOffers', authorize, OfferController.getAllOffers);
OfferRouter.get('/getListingOffers', authorize, OfferController.getListingOffers);
OfferRouter.get('/getUsersOfferListings', authorize, OfferController.getUsersOfferListings);

module.exports = OfferRouter; 