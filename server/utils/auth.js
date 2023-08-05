const jwt = require('jsonwebtoken');
const expiration = '2h';
const secret = process.env.JWT_SECRET;
module.exports = {
  authMiddleware: function (reqOrObject, res, next) {
    let req;
    if (res && next) {
      req = reqOrObject;
      next();
    } else {
      req = reqOrObject.req;
    }

    console.log('authMiddleware is being executed'); // Log when the function is called
    // console.log("HEADERS: ", req.headers);
    // console.log("REQ BODY: ", req.body);
    // console.log("REQ QUERY :", req.query);

    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      console.log('No token found');
      return req;
    }

    console.log('Token found:', token); // Log the token

    try {
      const data  = jwt.verify(token, secret, { maxAge: expiration });
      console.log('Token verified:', data); // Log the decoded token data
      req.user = data;
    } catch (error) {
      console.log('Invalid token:', error); // Log the error if the token is invalid
    }

    return req;
  }
};
