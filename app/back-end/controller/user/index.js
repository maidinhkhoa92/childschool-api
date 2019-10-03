const user = require("../../../services/user");
const error = require("../../../helper/error");
const validate = require("./validate");

module.exports.create = {
  Validate: validate.create,
  handler: (req, res) => {
    const body = req.body;

    user
      .create(body)
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
    var { paged, limit } = req.query;
    paged = parseInt(paged);
    limit = parseInt(limit);

    user
      .list(paged, limit)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        error(res.boom, err);
      });
  }
};

module.exports.detail = {
  handler: (req, res) => {
    const { id } = req.params;

    user
      .detail(id)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        error(res.boom, err);
      });
  }
};

module.exports.update = {
  Validate: validate.create,
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

module.exports.delete = {
  handler: (req, res) => {
    const { id } = req.params;

    user
      .remove(id)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        error(res.boom, err);
      });
  }
};
