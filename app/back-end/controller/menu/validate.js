const Joi = require('joi');
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      url: Joi.string().required(),
      name: Joi.string().required(),
      directorId: Joi.string().required()
    }
  },
}
