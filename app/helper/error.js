const error_data = require('./error.json');
module.exports = function (err, req, res, next) {
  if (err.name === "ValidationError") {
    res.boom.badRequest(err.errors[0].messages[0]);
  } else {
    const result = error_data[err.code];
    res.boom[result.method](result.msg);
  }
  
}

const duplicator = (error_message, error) => {
  if (error_message.includes("username_1")) {
    return 1;
  }
  if (error_message.includes("email_1")) {
    return 1;
  }
  if (error_message.includes('validation error')) {
    if(error.errors[0].messages[0].includes('"secondTeacher" contains an invalid value')) {
      return 10;
    }
  }
  return 0;
}
