const sequelize = require('./db');

exports.createListing = async (req,res) => {
    const rental = sequelize.models.rental;
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
    const rental = sequelize.models.rental;
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
    const rental = sequelize.models.rental;
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
    const rental = sequelize.models.rental;
    try {
        rental.findAll({ where: { sellerId: req.body.userId } }).then(rental => res.json(rental));
    } catch(err) {
        return res.status(500).send(err.message);
    }
}

exports.getListing = async (req,res) => {
    const rental = sequelize.models.rental;
    try {
        rental.findOne({ where: { id: req.body.id } }).then(rental => res.json(rental));
    } catch(err) {
        return res.status(500).send(err.message);
    }
}

exports.getAllListings = async (req,res) => {
    const rental = sequelize.models.rental;
    try {
        rental.findAll().then(rental => res.json(rental));
    } catch(err) {
        return res.status(500).send(err.message);
    }
}