const Joi = require('joi');
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      name: Joi.string().required(),
      group: Joi.string().required(),
      note: Joi.string().allow("").optional(),
      date: Joi.date().required(),
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
    }
  },
}
