const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  authMiddleware: function (reqOrObject, res, next) {
    // allows token to be sent via req.body, req.query, or headers
    let req;
  // Check if the function was called with three arguments (as middleware)
  if (res && next) {
    req = reqOrObject;
    // If you need to call next() as middleware, you can do it here
    next();
  } else {
    // Otherwise, it was called with one argument (as context)
    req = reqOrObject.req;
  }

  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  return req;
}
};
