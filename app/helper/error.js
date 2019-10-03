const error = require('./error.json');
module.exports = function (boom, Error) {
  switch (Error.code) {
    case 11000:
      const message = error[duplicator(Error.message)]
      boom.conflict(message);
      break;
    default:
      const result = error[Error.code];
      boom[result.method](result.msg);
      break;
  }
}

const duplicator = (error_message) => {
  if (error_message.includes("username_1")) {
    return 1;
  }
  if (error_message.includes("email_1")) {
    return 1;
  }
  return 0;
}
