const checkin = require('../../../services/checkin');
const error = require('../../../helper/error');
const validate = require('./validate');

module.exports.create = {
	Validate: validate.create,
	handler: (req, res) => {
		const body = req.body
		
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
