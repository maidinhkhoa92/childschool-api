const note = require('../../../services/note');
const error = require('../../../helper/error');
const validate = require('./validate');

module.exports.list = {
	handler: (req, res) => {
        const { id } = req.decoded;
		
		note.list(null, null, id).then(Note => {
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
		const user_id = req.decoded.id;
        const { id } = req.params;
		
		note.update(id, user_id, body).then(Note => {
			res.status(200).send(Note);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};