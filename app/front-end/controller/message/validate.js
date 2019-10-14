const Joi = require('joi');
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      message: Joi.string().required(),
      from_user: Joi.object().required(),
      to_user: Joi.array().items(Joi.string()).required(),
    }
  }
}
