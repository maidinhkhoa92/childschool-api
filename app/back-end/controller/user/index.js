const user = require("../../../crud/user");
const error = require("../../../helper/error");
const validate = require("./validate");

module.exports.create = (req, res, next) => {
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
};

module.exports.list = (req, res, next) => {
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
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;

  user
    .detail(id)
    .then(User => {
      res.status(200).send(User);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.update = (req, res, next) => {
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
};

module.exports.updateStatus = (req, res, next) => {
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
};

module.exports.remove = (req, res, next) => {
  const { id } = req.params;

  user
    .remove(id)
    .then(User => {
      res.status(200).send(User);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.count = (req, res, next) => {
  const { id } = req.params;
  user
    .countChild(id)
    .then(count => {
      res.status(200).send({ count });
    })
    .catch(err => {
      next(err);
    });
};

module.exports.resend = (req, res, next) => {
  const { email } = req.body;
  user
    .resend(email)
    .then(data => {
      res.status(200).send({ data });
    })
    .catch(err => {
      next(err);
    });
};