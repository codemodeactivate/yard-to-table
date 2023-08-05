const jwt = require('jsonwebtoken');
const expiration = '2h';
const secret = process.env.JWT_SECRET;

module.exports = {
  authMiddleware: function (req, res, next) {
    // Code to handle both Express middleware and ApolloServer context
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.method === 'GET' || (req.body && req.body.operationName === 'login') || (req.body && req.body.operationName === 'signUp')){
      if (next) next();
      return req;
    }

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      console.log('No token found');
      return req;
    }

    try {
      const data = jwt.verify(token, secret, { maxAge: expiration });
      console.log('Token verified:', data);
      req.user = data;
    } catch (error) {
      console.log('Invalid token:', error);
    }

    if (next) {
      next(); // Continue to the next middleware if it's an Express middleware
    }

    return req;
  },
};
