const Joi = require('joi');
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      name: Joi.string().required(),
	    group: Joi.string().required(),
      note: Joi.string().required(),
      time: Joi.string().required()
    }
  },
}
