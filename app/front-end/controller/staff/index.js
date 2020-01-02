const user = require("../../../services/user");
const error = require("../../../helper/error");
const validate = require("./validate");

module.exports.update = {
  Validate: validate.update,
  handler: (req, res) => {
    const { body } = req;
    const { id } = req.params;

    user
      .update(id, body)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        next(err);
      });
  }
};

module.exports.create = {
  Validate: validate.create,
  handler: (req, res) => {
    const body = req.body;
    const { id } = req.decoded;

    user
      .create(body, id)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        next(err);
      });
  }
};

module.exports.list = {
  handler: (req, res) => {
    const { id } = req.decoded;
    const type = "staff";
    user
      .center(id, type)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        next(err);
      });
  }
};
module.exports.deactive = {
  Validate: validate.deactive,
  handler: (req, res) => {
    const { id } = req.params;
    const { body } = req;
    
    user
      .update(id, body)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        next(err);
      });
  }
};
