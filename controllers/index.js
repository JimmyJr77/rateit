const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const categoriesRoutes = require('./categories-routes.js');
// const toolsRoutes = require('./tools-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/categories', categoriesRoutes);
// router.use('/tools', toolsRoutes);

module.exports = router;