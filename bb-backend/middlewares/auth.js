const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.JWT_KEY);
        console.log("Authentication Successful!");
        next();
    } catch (err) {
        res.status(401).json({ message: 'Authentication Failed!' });
    }
};