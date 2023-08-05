const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const expiration = '2h';
module.exports = {
  authMiddleware: function (req, res, next) {
    console.log('authMiddleware is being executed');
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      console.log('No token found');
      return next(); // Continue to next middleware if no token found
    }

    console.log('Token found:', token);

    try {
      const data  = jwt.verify(token, secret, { maxAge: expiration });
      console.log('Token verified:', data);
      req.user = data;
    } catch (error) {
      console.log('Invalid token:', error);
    }

    return next(); // Continue to next middleware
  }
};
