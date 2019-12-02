const note = require('../../../services/note');
const error = require('../../../helper/error');
const validate = require('./validate');

module.exports.list = {
	handler: (req, res) => {
		const { child_id } = req.query;
		
		note.list(null, null, child_id).then(Note => {
			res.status(200).send(Note);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};

module.exports.create = {
	Validate: validate.create,
	handler: (req, res) => {
        const body = req.body;
        const { id } = req.decoded;
		
		note.create(id, body).then(Note => {
			res.status(200).send(Note);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};

module.exports.update = {
	Validate: validate.update,
	handler: (req, res) => {
		const body = req.body;
        const { id } = req.params;
		
		note.update(id, body).then(Note => {
			res.status(200).send(Note);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};