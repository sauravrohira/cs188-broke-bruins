const sequelize = require('./db');
const userModel = sequelize.models.user

exports.createUser = async (username, password, email, primaryComm, primaryDetails, secretCode) => {
    let user = {
        username: username,
        password: password,
        email: email,
        primary_communication_method: primaryComm,
        primary_communication_details: primaryDetails,
        secretCode: secretCode
    }

    const addedUser = await userModel.create(user);
    console.log('User', addedUser.username, 'added successfully!');
    return addedUser;
}

exports.fetchUser = async (email) => {
    const user = await userModel.findOne({where: {email:email}});
    return user;
}