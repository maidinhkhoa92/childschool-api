const Joi = require('joi');
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      url: Joi.string().required(),
    }
  },
}
