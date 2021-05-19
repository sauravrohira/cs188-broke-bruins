const router = require('express').Router();

router.use("/user", require('./user.routes'));
router.use("/offer", require('./offer.routes'));
router.use("/rental", require('./rental.routes'));
router.use("/image", require('./image.routes'))

module.exports = router;

