const { Sequelize } = require('sequelize');

//Create new DB Connection
const sequelize = new Sequelize('da13n4i1qp275g', 'jgsgvynnnyhpxg', '68326a3fca136c4affe257a750d2925d9e449706e93055350705ca9eed918f5e', {
    host: 'ec2-34-225-167-77.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

//Define models 
const modelDefiners = [
    require('../models/user')
]
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

//Define Associations:

console.log(sequelize.models)

module.exports = sequelize;