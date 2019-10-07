const user = require("../../../services/user");
const error = require("../../../helper/error");
const validate = require("./validate");

module.exports.updatePassword = {
  Validate: validate.updatePassword,
  handler: (req, res) => {
    const { email, password, confirm } = req.body;
    
    user
      .updatePassword(email, password, confirm)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        error(res.boom, err);
      });
  }
};

module.exports.login = {
  Validate: validate.login,
  handler: function(req, res, next) {
    const { email, password } = req.body;

    user
      .login(email, password)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        error(res.boom, err);
      });
  }
};

module.exports.updateDigit = {
  Validate: validate.updateDigit,
  handler: function(req, res, next) {
    const { digit } = req.body;
    const { id } = req.decoded;

    user
      .updateDigit(id, digit)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        error(res.boom, err);
      });
  }
};

module.exports.compareDigit = {
  Validate: validate.updateDigit,
  handler: function(req, res, next) {
    const { digit } = req.body;
    const { id } = req.decoded;

    user
      .compareDigit(id, digit)
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
    const { body } = req;
    const { id } = req.params;

    user
      .update(id, body)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        error(res.boom, err);
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
        error(res.boom, err);
      });
  }
};

module.exports.list = {
  handler: (req, res) => {
    const { id } = req.decoded;

    user
      .center(id)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        error(res.boom, err);
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
        error(res.boom, err);
      });
  }
};
