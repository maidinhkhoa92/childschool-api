const Joi = require('joi');
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      date: Joi.string().required(),
      classes: Joi.string().required(),
    }
  },
  update: {
    options: { allowUnknownBody: false },
    body: {
      absent: Joi.array().items(Joi.string()).required(),
      checkin: Joi.array().items(Joi.string()).required(),
      checkout: Joi.array().items(Joi.string()).required(),
    }
  },
}
