const router = require('express').Router();

//include all versions of api:
router.use("/user", require('./user.routes'));
router.use("/rental", require('./rental.routes'));
router.use("/offer", require('./offer.routes'));

module.exports = router;