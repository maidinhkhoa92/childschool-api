const Joi = require('joi');
module.exports = {
  login: {
    options: { allowUnknownBody: false },
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }
  },
  create: {
    options: { allowUnknownBody: false },
    body: {
      email: Joi.string().email().required(),
      profile: Joi.object().required(),
    }
  },
}
