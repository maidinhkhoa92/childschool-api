const Joi = require('joi');
module.exports = {
  createUser: {
    options: { allowUnknownBody: false },
    body: {
      message: Joi.string().required(),
      from_user: Joi.object().required(),
      to_user: Joi.array().items(Joi.object()).required(),
    }
  },
  createClass: {
    options: { allowUnknownBody: false },
    body: {
      message: Joi.string().required(),
      from_user: Joi.object().required(),
      to_class: Joi.array().items(Joi.object()).required(),
    }
  }
}
