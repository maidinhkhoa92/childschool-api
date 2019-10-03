const Joi = require('joi');
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      name: Joi.string().required(),
      child: Joi.array().items(Joi.string()),
      directorId: Joi.string().required()
    }
  },
}
