const Menu = require("../../../crud/menu");
const validate = require('./validate');

module.exports.list = {
  handler: (req, res, next) => {
    var { paged, limit } = req.query;
    paged = parseInt(paged);
    limit = parseInt(limit);

    Menu.list(paged, limit)
      .then(Data => {
        res.status(200).send(Data);
      })
      .catch(err => {
        next(err);
      });
  }
};

module.exports.detail = {
  handler: (req, res, next) => {
    const { id } = req.params;

    Menu.detail(id)
      .then(Data => {
        res.status(200).send(Data);
      })
      .catch(err => {
        next(err);
      });
  }
};

module.exports.create = {
  Validate: validate.create,
  handler: (req, res, next) => {
    Menu.create(req.body)
      .then(Data => {
        res.status(200).send(Data);
      })
      .catch(err => {
        next(err);
      });
  }
};

module.exports.update = {
  Validate: validate.create,
  handler: (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    Menu
      .update(id, body)
      .then(Data => {
        res.status(200).send(Data);
      })
      .catch(err => {
        next(err);
      });
  }
};

module.exports.remove = {
  handler: (req, res, next) => {
    const { id } = req.params;

    Menu
      .remove(id)
      .then(Data => {
        res.status(200).send(Data);
      })
      .catch(err => {
        next(err);
      });
  }
};
