const router = require('express').Router();
const { Users } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        const { name: username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: "Username and password required." });
            return;
        }
        
        const user = await Users.findOne({
            where: {
                name: username
            }
        });

        if (!user) {
            res.status(400).json({ message: "Username or password was incorrect." });
            return;
        }
        
        if (!user.checkPassword(password)) {
            res.status(400).json({ message: "Username or password was incorrect." });
            return;
        }
        
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = user.id;
            res.status(200).json({ message: "Logged in!" })
        });
    } 
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error has occurred." });
    }
});

router.post('/logout', (req, res) => {
    try {
        req.session.loggedIn = false;
        req.session.userId = null;

        req.session.destroy(() => {
            res.status(200).json({ message: "Logged out!" });
        });
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error has occurred." });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { name: username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: "Username and password required." });
            return;
        }

        const foundUser = await Users.findOne({
            where: {
                name: username
            }
        });

        if (foundUser) {
            res.status(400).json({ message: "Username is already taken!" });
            return;
        }

        const newUser = await Users.create({ name: username, password }, { returning: true, individualHooks: true });

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = newUser.id;
            res.status(200).json({ message: "Signed up" })
        });
    } 
    catch(err) {
        if (!err.errors) {
            console.error(err);
            res.status(500).json({ message: "A server error has occurred." });
            return;
        }

        const error = err.errors[0];

        if (error.type !== 'Validation error') return;

        const dataName = error.path;
        const dataNameCap = error.path.charAt(0).toUpperCase() + error.path.slice(1).toLowerCase();
        const validate = Users.getAttributes()[dataName].validate;

        if (error.validatorName === 'len') {
            res.status(400).json({ message: `${dataNameCap} must be at least ${validate.len[0]} characters long!` });
        }

        else if (error.validatorName === 'isAlphanumeric') {
            res.status(400).json({ message: `${dataNameCap} must contain only letters and numbers!` });
        }

        else {
            res.status(400).json({ message: error.message });
        }
    }
});

module.exports = router;