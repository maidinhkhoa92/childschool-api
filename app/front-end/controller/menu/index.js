const menu = require('../../../services/menu');
const error = require('../../../helper/error');
const validate = require('./validate');

module.exports.list = {
	handler: (req, res) => {
		const { id } = req.decoded;
		const { director } = req.query;
		const check_id = director || id;
		menu.list(check_id).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
};

module.exports.create = {
	Validate: validate.create,
	handler: (req, res) => {
        const body = req.body;
        const { id } = req.decoded;
		
		menu.create(id, body).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
};
