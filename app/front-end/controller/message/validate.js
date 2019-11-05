const Joi = require('joi');
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      message: Joi.string().required(),
      from_user: Joi.string().required(),
      to_user: Joi.array().items(Joi.string()).required(),
      classes: Joi.array().items(Joi.string()).required(),
      type: Joi.string().required().valid('class', 'user'),
    }
  },
  update: {
    options: { allowUnknownBody: false },
    body: {
      oldMessage: Joi.array().items(Joi.object()).required(),
      currentMessage: Joi.string().required(),
      firestore: Joi.string().required(),
    }
  }
}
