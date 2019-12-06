const error = require('./error.json');
module.exports = function (boom, Error) {
  switch (Error.code) {
    case 11000:
      const message = error[duplicator(Error.message, Error)]
      boom.conflict(message);
      break;
    default:
      const result = error[Error.code];
      boom[result.method](result.msg);
      break;
  }
}

const duplicator = (error_message, error) => {
  console.log(error.errors[0].messages[0])
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
