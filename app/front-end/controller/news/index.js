const news = require("../../../services/news");
const error = require('../../../helper/error');

module.exports.list = {
	handler: (req, res) => {
		const { date, child_id, type } = req.query;
		
		news.list(date, type, child_id).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
};