const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
    res.render('index', { loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/modal', async (req, res) => {
    try {
        res.render('modal', { loggedIn: req.session.loggedIn });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;