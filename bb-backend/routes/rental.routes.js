const RentalRouter = require('express').Router();
const RentalController = require('../controllers/rental.controller');
const {createListingValidator} = require('../utils/validators');
const authorize = require('../middlewares/auth');

RentalRouter.post('/createListing', authorize, createListingValidator, RentalController.createListing);
RentalRouter.post('/updateListing', authorize, RentalController.updateListing);
RentalRouter.post('/deleteListing', authorize, RentalController.deleteListing);
RentalRouter.get('/getUserListings', authorize, RentalController.getUserListings);
RentalRouter.get('/getOffersOnListing', authorize, RentalController.getOffersOnListing);
RentalRouter.get('/getAllButUserListings', authorize, RentalController.getAllButUserListings);
RentalRouter.get('/getListing', authorize, RentalController.getListing);
RentalRouter.get('/getAllListings', authorize, RentalController.getAllListings);

module.exports = RentalRouter;