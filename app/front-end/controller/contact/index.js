const contact = require('../../../services/contact');
const error = require('../../../helper/error');
const validate = require('./validate');

module.exports.create = {
	Validate: validate.create,
	handler: (req, res, next) => {
		const { body } = req;
		contact.create(body).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
};