const Joi = require('joi');
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      note: Joi.string().required(),
      datePaid: Joi.string().required(),
      director: Joi.string().required(),
      status: Joi.string()
        .required()
        .valid('Pending', 'Completed', 'Open')
    }
  },
}
