const event = require('../../../services/event');
const error = require('../../../helper/error');
const validate = require('./validate');

module.exports.list = {
	handler: (req, res) => {
		var { paged, limit } = req.query;
		paged = parseInt(paged);
		limit = parseInt(limit);
		
		event.list(paged, limit).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
}

module.exports.detail = {
	handler: (req, res) => {
		const { id } = req.params;
		
		event.detail(id).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
}

module.exports.create = {
	Validate: validate.create,
	handler: (req, res) => {
		const { body } = req;
		
		event.create(body).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
}

module.exports.update = {
	Validate: validate.create,
	handler: (req, res) => {
		const { id } = req.params;
		const { body } = req;
		
		event.update(id, body).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
}

module.exports.remove = {
	handler: (req, res) => {
		const { id } = req.params;
		
		event.remove(id).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
}