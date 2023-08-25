const router = require('express').Router();

const reviewRoutes = require('./review-routes.js');
const toolsRoutes = require('./tools-routes.js');
const usersRoutes = require('./users-routes.js');

// router.use('/reviews', reviewRoutes);
router.use('/tools', toolsRoutes);
router.use('/users', usersRoutes);

module.exports = router;