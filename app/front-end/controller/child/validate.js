const Joi = require("joi");
module.exports = {
  create: {
    options: { allowUnknownBody: false },
    body: {
      name: Joi.string().required()
    }
  },
  update: {
    options: { allowUnknownBody: false },
    body: {
      profile: Joi.object().required()
    }
  },
  updateNews: {
    options: { allowUnknownBody: false },
    body: {
      ids: Joi.array()
        .items(Joi.string())
        .required(),
      news: {
        title: Joi.string().required(),
        time: Joi.string().required(),
        group: Joi.string()
          .allow("")
          .optional(),
        selected: Joi.array().items(Joi.string()),
        note: Joi.array().items(Joi.string()),
        type: Joi.string()
          .required()
          .valid(
            "Bathroom",
            "Photo",
            "Video",
            "Foods",
            "FeedingBottle",
            "Achievements",
            "CheerUp",
            "Siesta",
            "Medicines",
            "Incidents"
          ),
        content: Joi.string()
          .allow("")
          .optional()
      }
    }
  },
  updateStatus: {
    options: { allowUnknownBody: false },
    body: {
      title: Joi.string().required(),
      time: Joi.string().required(),
      group: Joi.string()
        .allow("")
        .optional(),
      selected: Joi.array().items(Joi.string()),
      note: Joi.array().items(Joi.string()),
      type: Joi.string()
        .required()
        .valid(
          "Bathroom",
          "Photo",
          "Video",
          "Foods",
          "FeedingBottle",
          "Achievements",
          "CheerUp",
          "Siesta",
          "Medicines",
          "Incidents"
        ),
      content: Joi.string()
        .allow("")
        .optional()
    }
  },
  updateChildPerson: {
    options: { allowUnknownBody: false },
    body: {
      children: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
      }, 
      firstTeacher: Joi.string().required(), 
      secondTeacher: Joi.string().disallow(Joi.ref('firstTeacher')).required(), 
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
  search: {
    options: { allowUnknownBody: false },
    body: {
      word: Joi.string().required(),
    }
  },
};
