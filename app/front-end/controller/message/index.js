const messages = require("../../../services/messages");
const error = require("../../../helper/error");
const validate = require("./validate");

module.exports.createClass = {
  Validate: validate.createClass,
  handler: (req, res) => {
    const { message, from_user, to_class } = req.body;
    messages
      .create(from_user, to_class, message)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        error(res.boom, err);
      });
  }
};

module.exports.createUser = {
  Validate: validate.createUser,
  handler: (req, res) => {
    const { message, from_user, to_user } = req.body;
    messages
      .create(from_user, to_user, message)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        error(res.boom, err);
      });
  }
};