const Joi = require('joi');
module.exports = {
  login: {
    options: { allowUnknownBody: false },
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    }
  },
}
