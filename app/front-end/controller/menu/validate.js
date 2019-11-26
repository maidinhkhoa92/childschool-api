const Joi = require('joi');
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      name: Joi.string().required(),
      url: Joi.string().required(),
    }
  },
}
