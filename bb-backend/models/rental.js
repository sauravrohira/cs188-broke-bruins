const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('rental', {
        rentalId: {
            allowNull: false,
            type: DataTypes.STRING
        },
        sellerId: {
            allowNull: false,
            type: DataTypes.STRING
        },
        imageUrl: {
            allowNull: true,
            type: DataTypes.STRING
        },
        price: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        sold: {
            allowNull: false,
            type: DataTypes.BOOLEAN
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING
        }
    })
}
