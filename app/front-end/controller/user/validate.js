const Joi = require('joi');
module.exports = {
  login: {
    options: { allowUnknownBody: false },
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }
  },
  update: {
    options: { allowUnknownBody: false },
    body: {
      email: Joi.string().email().required(),
      profile: Joi.object().required(),
    }
  },
  updatePassword: {
    options: { allowUnknownBody: false },
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirm: Joi.string().required(),
    }
  },
  updateDigit: {
    options: { allowUnknownBody: false },
    body: {
      digit: Joi.array().items(Joi.number()).required(),
    }
  },
  create: {
    options: { allowUnknownBody: false },
    body: {
      email: Joi.string().email().required(),
      profile: Joi.object().required(),
      typeOfUser: Joi.string().required().valid('director', 'staff', 'family'),
    }
  },
  deactive: {
    options: { allowUnknownBody: false },
    body: {
      status: Joi.boolean(),
    }
  },
  changeDigit: {
    options: { allowUnknownBody: false },
    body: {
      oldDigit: Joi.array().items(Joi.number()).required(),
      newDigit: Joi.array().items(Joi.number()).required(),
      confirmDigit: Joi.array().items(Joi.number()).required(),
    }
  },
}
