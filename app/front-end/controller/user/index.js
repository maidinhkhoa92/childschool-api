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
        next(err);
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
        next(err);
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
        next(err);
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
        next(err);
      });
  }
};

module.exports.changeDigit = {
  Validate: validate.changeDigit,
  handler: function(req, res, next) {
    const { oldDigit, newDigit, confirmDigit } = req.body;
    const { id } = req.decoded;

    user
      .changeDigit(id, oldDigit, newDigit, confirmDigit)
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
  handler: (req, res) => {
    const { body } = req;
    const { id } = req.params;
    body.completed = true;
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

    user
      .center(id)
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
    
    user
      .remove(id)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        next(err);
      });
  }
};

module.exports.forgotDigit = {
  Validate: validate.forgotDigit,
  handler: (req, res) => {
    const { email } = req.body;
    user
      .forgotDigit(email)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        next(err);
      });
  }
}