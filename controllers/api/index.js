const router = require('express').Router();

const reviewsRoutes = require('./review-routes.js');
const toolsRoutes = require('./tools-routes.js');
const usersRoutes = require('./users-routes.js');

router.use('/reviews', reviewsRoutes);
router.use('/tools', toolsRoutes);
router.use('/users', usersRoutes);

module.exports = router;