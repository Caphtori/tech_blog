const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRoutes.js');

router.use('/', homeRoutes);
router.use('/u', userRoutes);
router.use('/p', postRoutes);
router.use('/api', apiRoutes);

module.exports = router;