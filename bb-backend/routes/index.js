const router = require('express').Router();

//include all versions of api:
router.use("/user", require('./user.routes'));
router.use("/rental", require('./rental.routes'));
router.use("/offer", require('./offer.routes'));
router.get('/user/login', async (req, res) => { return res.status(200).send("hello")})

module.exports = router;