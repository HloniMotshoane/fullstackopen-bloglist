const jwt = require('jsonwebtoken');
const User = require('../models/user');
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('Authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    }
    next();
};

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
        return response.status(401).json({ error: 'User not found' });
    }

    request.user = user;
    next();
};

module.exports = {
    tokenExtractor,
    userExtractor
};
