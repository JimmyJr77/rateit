const auth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    next();
}

module.exports = auth;