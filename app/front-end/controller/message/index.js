const message = require("../../../services/message");
const error = require("../../../helper/error");
const validate = require("./validate");

module.exports.create = {
  Validate: validate.create,
  handler: (req, res) => {
    const { message, from_user, to_user } = req.body;
    
    message
      .create(from_user, to_user, message)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        error(res.boom, err);
      });
  }
};