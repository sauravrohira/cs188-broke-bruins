const RentalRouter = require('express').Router();
const RentalController = require('../controllers/rental.controller');
const {createListingValidator} = require('../utils/validators');

RentalRouter.post('/createListing', createListingValidator, RentalController.createListing);
RentalRouter.post('/updateListing', RentalController.updateListing);
RentalRouter.post('/deleteListing', RentalController.deleteListing);
RentalRouter.get('/getUserListings', RentalController.getUserListings);
RentalRouter.get('/getOffersOnListing', RentalController.getOffersOnListing);
RentalRouter.get('/getAllButUserListings', RentalController.getAllButUserListings);
RentalRouter.get('/getListing', RentalController.getListing);
RentalRouter.get('/getAllListings', RentalController.getAllListings);

module.exports = RentalRouter;