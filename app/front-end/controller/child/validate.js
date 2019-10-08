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
      profile: Joi.object().required(),
    }
  },
  updateNews: {
    options: { allowUnknownBody: false },
    body: {
      ids: Joi.array().items(Joi.string()).required(),
      news: {
        title: Joi.string().required(),
        note: Joi.array().items(Joi.string()).required(),
        type: Joi.string().required().valid(
          "Bathroom",
          "Photo",
          "Video",
          "Foods",
          "FeedingBottle",
          "Achievements",
          "CheerUp",
          "Siesta",
          "Medicines",
          "Incidents"),
        content: Joi.string().required(),
      }
    } 
  }
}
