const Joi = require('joi');
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      description: Joi.string().required(),
      childId: Joi.string().required(),
    }
  },
  update: {
    options: { allowUnknownBody: false },
    body: {
      time: Joi.string().required(),
    }
  },
}
