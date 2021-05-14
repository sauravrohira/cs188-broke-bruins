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
        confirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })
}