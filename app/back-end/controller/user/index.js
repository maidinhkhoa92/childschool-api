const user = require("../../../crud/user");
const error = require("../../../helper/error");
const validate = require("./validate");

module.exports.create = {
  Validate: validate.create,
  handler: (req, res, next) => {
    const body = req.body;
    body.typeOfUser = 'director';
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
    let { city } = req.query;

    let params = {};
    
    params.typeOfUser = 'director';

    if (city) {
      params = {
        ...params,
        "profile.city": city
      }
    }
    user
      .list(params)
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
  Validate: validate.update,
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

module.exports.remove = {
  Validate: validate.remove,
  handler: (req, res, next) => {
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

module.exports.count = {
  handler: (req, res, next) => {
    const { id } = req.params;
    user
      .countChild(id)
      .then(count => {
        res.status(200).send({count});
      })
      .catch(err => {
        next(err);
      });
  }
};