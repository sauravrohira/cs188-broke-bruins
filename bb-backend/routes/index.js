const router = require('express').Router();

router.use("/user", require('./user.routes'));
router.use("/image", require('./image.routes'));


module.exports = router;

