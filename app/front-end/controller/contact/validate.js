const Joi = require('joi');
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      email: Joi.string().email().required(),
      firstName: Joi.string().allow('').optional(),
      lastName: Joi.string().allow('').optional(),
      telephone: Joi.string().allow('').optional(),
      typeOfUser: Joi.string().required().valid('director', 'staff', 'family'),
    }
  },
}
