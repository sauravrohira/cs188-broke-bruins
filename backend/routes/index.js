const router = require('express').Router();

//include all versions of api:
router.use("/user", require('./user.routes'));

module.exports = router;

