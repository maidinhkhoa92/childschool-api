const child = require('../../../services/child');
const error = require('../../../helper/error');
const validate = require('./validate');

module.exports.detail = {
	handler: (req, res) => {
		const { id } = req.params;
		
		child.detail(id).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};

module.exports.update = {
	Validate: validate.update,
	handler: (req, res) => {
		const { id } = req.params;
		const {profile} = req.body
		
		child.update(id, profile).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};