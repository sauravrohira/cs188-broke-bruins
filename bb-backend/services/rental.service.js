const sequelize = require('./db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const rental = sequelize.models.rental;

exports.createListing = async (req,res) => {
    try {
        const Rental = await rental.create({
            sellerId: req.body.userId,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            sold: req.body.sold,
            title: req.body.title,
            description: req.body.description
        });
        return res.status(200).json({ Rental });
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.message);
    }
}

exports.updateListing = async (req,res) => {
    try {
        const [rows, [Rental]] = await rental.update({
            sellerId: req.body.userId,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            sold: req.body.sold,
            title: req.body.title,
            description: req.body.description
        }, { returning: true, where: { id: req.body.id } });
        
        if (Rental) {
            return res.status(200).json({ Rental });
        }
        throw new Error("Rental not found");
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.message);
    }
}

exports.deleteListing = async (req,res) => {
    try {
        const deleted = await rental.destroy({ where: { id: req.body.id } });
        
        if (deleted) {
            return res.status(200).send("Rental deleted");
        }
        throw new Error("Rental not found");
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.getUserListings = async (req,res) => {
    try {
        rental.findAll({ where: { sellerId: req.query.userId } }).then(rental => res.json(rental));
    } catch(err) {
        return res.status(500).send(err.message);
    }
}

exports.getOffersOnListing = async (req,res) => {
    try {
        var listing = await rental.findOne({ where: { id: req.body.listingId } })
        var offers = await listing.getOffers();
        return res.status(200).send(offers); 
    } catch(err) {
        return res.status(500).send(err.message);
    }
}

exports.getAllButUserListings = async (req,res) => {
    try {
        var allButUserRentals = await rental.findAll({ where: { sellerId: { [Op.ne]: req.query.userId } } });
        var listings = [];
        for(var i = 0; i < allButUserRentals.length; i++) {
            var listing = allButUserRentals[i];
            var offers = await allButUserRentals[i].getOffers();
            var match = false;
            for(var j = 0; j < offers.length; j++) {
                if(offers[j].buyerId == req.query.userId) {
                    match = true;
                    break;
                }
            }
            if(match) {
                listing.dataValues.offerPlaced = true;
            } else {
                listing.dataValues.offerPlaced = false;
            }
            listings.push(listing);
        }
        return res.status(200).send(listings);
    } catch(err) {
        return res.status(500).send(err.message);
    }
}

exports.getListing = async (req,res) => {
    try {
        rental.findOne({ where: { id: req.body.id } }).then(rental => res.json(rental));
    } catch(err) {
        return res.status(500).send(err.message);
    }
}

exports.getAllListings = async (req,res) => {
    try {
        rental.findAll().then(rental => res.json(rental));
    } catch(err) {
        return res.status(500).send(err.message);
    }
}