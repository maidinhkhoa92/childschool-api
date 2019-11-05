const messages = require("../../../services/messages");
const error = require("../../../helper/error");
const validate = require("./validate");


module.exports.create = {
  Validate: validate.create,
  handler: (req, res) => {
    const { message, from_user, to_user, classes, type } = req.body;
    messages
      .create(from_user, to_user, message, classes, type)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        error(res.boom, err);
      });
  }
};

module.exports.list = {
  handler: (req, res) => {
    const { id, type } = req.decoded;
    const { class_id } = req.query

    messages
      .list(1, 999, id, type, class_id)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        error(res.boom, err);
      });
  }
};

module.exports.update = {
  Validate: validate.update,
  handler: (req, res) => {
    const { id } = req.params;
    const { oldMessage, currentMessage, firestore } = req.body;
    const user_id = req.decoded.id
    messages
      .update(id, firestore, currentMessage, oldMessage, user_id)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.log(err);
        error(res.boom, err);
      });
  }
};