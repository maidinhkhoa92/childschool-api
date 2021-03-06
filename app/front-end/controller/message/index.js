const messages = require("../../../services/messages");
const error = require("../../../helper/error");
const validate = require("./validate");


module.exports.create = {
  Validate: validate.create,
  handler: (req, res, next) => {
    const { message, from_user, to_user, classes, type, note } = req.body;
    messages
      .create(from_user, to_user, message, classes, type, note)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        next(err);
      });
  }
};

module.exports.list = {
  handler: (req, res, next) => {
    const { id, type } = req.decoded;
    const { class_id } = req.query

    messages
      .list(1, 999, id, type, class_id)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        next(err);
      });
  }
};

module.exports.update = {
  Validate: validate.update,
  handler: (req, res, next) => {
    const { id } = req.params;
    const { oldMessage, currentMessage, firestore } = req.body;
    const user_id = req.decoded.id
    messages
      .update(id, firestore, currentMessage, oldMessage, user_id)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        next(err);
      });
  }
};