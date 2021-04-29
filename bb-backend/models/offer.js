const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('offer', {
        buyer_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        seller_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })
}