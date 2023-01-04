const router = require('express').Router();
router.use('/board/', require('./boardRoute.js'));

module.exports = router;
