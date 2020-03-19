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
  update: {
    options: { allowUnknownBody: false },
    body: {
      settings: {
        current: Joi.number().required(),
        before: Joi.number().required(),
        paymentMethod: Joi.string().required(),
        note: Joi.string().required(),
        total: Joi.number().required()
      }
    }
  },
}
