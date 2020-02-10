const News = require("../../../crud/news");

module.exports.remove = {
  handler: (req, res, next) => {
    const { child_id, news_id } = req.params;

    News.remove(child_id, news_id)
      .then(Data => {
        res.status(200).send(Data);
      })
      .catch(err => {
        next(err);
      });
  }
};
