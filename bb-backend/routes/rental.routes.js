const RentalRouter = require('express').Router();
const RentalController = require('../controllers/rental.controller');

RentalRouter.post('/createListing', RentalController.createListing);
RentalRouter.post('/updateListing', RentalController.updateListing);
RentalRouter.post('/deleteListing', RentalController.deleteListing);
RentalRouter.get('/getUserListings', RentalController.getUserListings);
RentalRouter.get('/getOffersOnListing', RentalController.getOffersOnListing);
RentalRouter.get('/getAllButUserListings', RentalController.getAllButUserListings);
RentalRouter.get('/getListing', RentalController.getListing);
RentalRouter.get('/getAllListings', RentalController.getAllListings);

module.exports = RentalRouter;