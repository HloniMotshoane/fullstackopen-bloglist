const jwt = require('jsonwebtoken');

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.substring(7);
    } else {
        req.token = null;
    }
    next();
};

const userExtractor = (req, res, next) => {
    if (!req.token) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    jwt.verify(req.token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'token invalid' });
        }

        req.user = decodedToken;
        next();
    });
};

module.exports = { tokenExtractor, userExtractor };
