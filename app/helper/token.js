const jwt = require('jsonwebtoken');
const error = require('./error');

module.exports = function (req, res, next) {
  var token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token !== undefined) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, 'token_token_miracles', function (err, decoded) {
      if (err) {
        res.boom.unauthorized('Token is not valid')
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.boom.unauthorized('No token')
  }
}
