const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('user', {
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false,
            validate: {
                // We require usernames to have length of at least 3, and
                // only use letters, numbers and underscores.
                is: /^\w{3,}$/
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        primary_communication_method: {
            type: DataTypes.STRING,
        },
        primary_communication_details: {
            type: DataTypes.STRING,
        },
        secondary_communication_method: {
            type: DataTypes.STRING,
        },
        secondary_communication_details: {
            type: DataTypes.STRING,
        }
    })
}