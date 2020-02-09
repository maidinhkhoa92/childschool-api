const user = require("../../../services/user");
const error = require("../../../helper/error");
const validate = require("./validate");

module.exports.create = {
  Validate: validate.create,
  handler: (req, res, next) => {
    const body = req.body;

    user
      .create(body)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        next(err);
      });
  }
};

module.exports.list = {
  handler: (req, res, next) => {
    let { paged, limit, type, directorId } = req.query;
    paged = parseInt(paged);
    limit = parseInt(limit);

    let params = {};

    if (type) {
      params.typeOfUser = type;
    }

    if (directorId) {
      params.directorId = directorId;
    }

    user
      .list(paged, limit, params)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        next(err);
      });
  }
};

module.exports.detail = {
  handler: (req, res, next) => {
    const { id } = req.params;

    user
      .detail(id)
      .then(User => {
        res.status(200).send(User);
      })
      .catch(err => {
        next(err);
      });
  }
};

module.exports.update = {
  Validate: validate.create,
  handler: (req, res, next) => {
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

module.exports.delete = {
  handler: (req, res, next) => {
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
