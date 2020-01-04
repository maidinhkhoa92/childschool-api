const error_data = require('./error.json');
module.exports = function (err, req, res, next) {
  if (err.name === "ValidationError") {
    res.boom.badRequest(err.errors[0].messages[0]);
  } else {
    
    if(err.code === 11000) {
      const result = error_data[err.code];
      res.boom.conflict(result);
    } else {
      const result = error_data[err.code];
      res.boom[result.method](result.msg);
    }
  }
}
