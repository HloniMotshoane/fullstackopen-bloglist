const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const loginRouter = require('express').Router();

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
