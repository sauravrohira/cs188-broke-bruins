const RentalRouter = require('express').Router();
const RentalController = require('../controllers/rental.controller');

RentalRouter.post('/createListing', RentalController.createListing);
RentalRouter.post('/updateListing/:id', RentalController.updateListing);
RentalRouter.post('/deleteListing/:id', RentalController.deleteListing);
RentalRouter.get('/getUserListings', RentalController.getUserListings);
RentalRouter.get('/searchListings', RentalController.searchListing);

module.exports = RentalRouter;