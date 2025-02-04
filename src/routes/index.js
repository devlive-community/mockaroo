const express = require('express');
const router = express.Router();

router.use('/', require('./basic'))
router.use('/posts', require('./posts'))
router.use('/upload', require('./upload'))

module.exports = router;