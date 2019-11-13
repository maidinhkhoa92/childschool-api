const Joi = require('joi');
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      name: Joi.string().required(),
    }
  },
  update: {
    options: { allowUnknownBody: false },
    body: {
      children: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
      }, 
      firstTeacher: Joi.string().required(), 
      secondTeacher: Joi.string().required(), 
      family: {
        profile: {
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          telephone: Joi.string().required(),
        },
        email: Joi.string().email().required(),
      }
    }
  },
  removeClass: {
    options: { allowUnknownBody: false },
    body: {
      childId: Joi.string().required(),
    }
  },
  updateInfor: {
    options: { allowUnknownBody: false },
    body: {
      name: Joi.string().required(),
    }
  }
}
