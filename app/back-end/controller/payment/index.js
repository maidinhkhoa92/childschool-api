const Payment = require("../../../crud/payment");

module.exports.create = async (req, res, next) => {
  const body = req.body;
  try {
    const data = await Payment.create(body);
    const Detail = await Payment.detail(data.id);
    res.status(200).send(Detail);
  } catch(err) {
    next(err);
  }
}

module.exports.update = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const data = await Payment.update(id, body);
    const Detail = await Payment.detail(data.id);
    res.status(200).send(Detail);
  } catch(err) {
    next(err);
  }
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