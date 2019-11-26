const checkin = require('../../../services/checkin');
const error = require('../../../helper/error');
const validate = require('./validate');

module.exports.list = {
	handler: (req, res) => {
		const { id } = req.decoded;
		checkin.list(id).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
}

module.exports.create = {
	Validate: validate.create,
	handler: (req, res) => {
		const body = req.body;
		const { id } = req.decoded;
		body.director = id;
		checkin.createOrUpdate(body).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};

module.exports.update = {
	Validate: validate.update,
	handler: (req, res) => {
		const body = req.body
		const { id } = req.params;
		
		checkin.update(id, body).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};