const Joi = require('joi');
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      name: Joi.string().required(),
    }
  },
  update: {
    options: { allowUnknownBody: false },
    body: {
      profile: Joi.object().required(),
    }
  },
}
