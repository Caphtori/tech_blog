const router = require('express').Router();

const commentRoutes = require('./commentRoutes.js');
const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRoutes.js');

router.use('/comment', commentRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);

module.exports = router;