const Event = require("../../../crud/event");

module.exports.list = {
  handler: (req, res, next) => {
    var { paged, limit } = req.query;
    paged = parseInt(paged);
    limit = parseInt(limit);

    Event.list(paged, limit)
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

    Event.detail(id)
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

    Event.remove(id)
      .then(Data => {
        res.status(200).send(Data);
      })
      .catch(err => {
        next(err);
      });
  }
};
