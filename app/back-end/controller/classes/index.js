const classes = require('../../../services/classes');
const error = require('../../../helper/error');
const validate = require('./validate');

module.exports.list = {
	handler: (req, res) => {
		var { paged, limit } = req.query;
		paged = parseInt(paged);
		limit = parseInt(limit);
		
		classes.list(paged, limit).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
}

module.exports.detail = {
	handler: (req, res) => {
		const { id } = req.params;
		
		classes.detail(id).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
}

module.exports.create = {
	Validate: validate.create,
	handler: (req, res) => {
		const { directorId, name, child } = req.body;
		const params = {
			name,
			child
		}
		
		classes.create(directorId, params).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
}

module.exports.update = {
	Validate: validate.create,
	handler: (req, res) => {
		const { id } = req.params;
		const { body } = req;
		
		classes.update(id, body.directorId, body).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
}

module.exports.remove = {
	handler: (req, res) => {
		const { id } = req.params;
		
		classes.remove(id).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
}