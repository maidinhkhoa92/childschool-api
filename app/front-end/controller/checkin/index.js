const checkin = require('../../../services/checkin');
const user = require('../../../services/user');
const error = require('../../../helper/error');
const validate = require('./validate');

module.exports.list = {
	handler: (req, res, next) => {
		const { id } = req.decoded;
		checkin.list(id).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
}

module.exports.create = {
	Validate: validate.create,
	handler: async (req, res, next) => {
		const body = req.body;
		const { id, type } = req.decoded;
		if(type === 'director') {
			body.director = id;
		}
		if(type === 'staff') {
			const staff = await user.detail(id);
			body.director = staff.directorId
		}
		
		checkin.createOrUpdate(body).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			console.log(err)
			next(err);
		});
	}
};

module.exports.update = {
	Validate: validate.update,
	handler: (req, res, next) => {
		const body = req.body
		const { id } = req.params;
		
		checkin.update(id, body).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
};
