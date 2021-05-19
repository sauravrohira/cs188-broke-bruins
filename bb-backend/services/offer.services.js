const sequelize = require('./db');
const offer = sequelize.models.offer;

exports.createOffer = async (req, res) => {
    try {
        const Offer = await offer.create({
            buyerId: req.body.buyerId,
            sellerId: req.body.sellerId,
            confirmed: req.body.confirmed,
            listingId: req.body.listingId
        });
        return res.status(200).json({ Offer });
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.message);
    }
}

exports.updateOffer = async (req,res) => {
    try {
        const [rows, [Offer]] = await offer.update({
            buyerId: req.body.buyerId,
            sellerId: req.body.sellerId,
            confirmed: req.body.confirmed,
            listingId: req.body.listingId
        }, { returning: true, where: { id: req.body.id } });

        if (Offer) {
            return res.status(200).json({ Offer });
        }
        throw new Error("Offer not found");
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.message);
    }
}

exports.deleteOffer = async (req,res) => {
    try {
        const deleted = await offer.destroy({ where: { id: req.body.id } });

        if (deleted) {
            return res.status(200).send("Offer deleted");
        }
        throw new Error("Offer not found");
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.getOffer = async (req,res) => {
    try {
        offer.findOne({ where: { id: req.body.id } }).then(offer => res.json(offer));
    } catch(err) {
        return res.status(500).send(err.message);
    }
}

exports.getAllOffers = async (req,res) => {
    try {
        offer.findAll().then(offer => res.json(offer));
    } catch(err) {
        return res.status(500).send(err.message);
    }
}

exports.getListingOffers = async (req,res) => {
    try {
        offer.findAll({ where: { listingId: req.body.listingId } }).then(offer => res.json(offer));
    } catch(err) {
        return res.status(500).send(err.message);
    }
}

exports.getUsersOfferListings = async (req,res) => {
    try {
        const userOffers = await offer.findAll({ where: { buyerId: req.query.userId } });
        var listings = [];
        for (var i = 0; i < userOffers.length; i++) {
            listings.push(await userOffers[i].getRental());
        }
        return res.status(200).send(listings);
    } catch(err) {
        return res.status(500).send(err.message);
    }
}