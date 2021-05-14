const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('offer', {
        buyerId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sellerId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        listingId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })
}