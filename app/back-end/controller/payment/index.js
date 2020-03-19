const Payment = require("../../../crud/payment");

module.exports.create = (req, res, next) => {
  const body = req.body;
  Payment
    .create(body)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      next(err);
    });
}

module.exports.list = (req, res, next) => {
  let { director, startDate, endDate } = req.query;

  let params = {};

  if (director) {
    params = {
      ...params,
      director
    }
  }

  if (startDate && endDate) {
    params = {
      ...params,
      datePaid: {
        $gte: new Date(startDate),
        $lt: new Date(endDate)
      }
    }
  }

  Payment
    .list(params)
    .then(User => {
      res.status(200).send(User);
    })
    .catch(err => {
      next(err);
    });
}