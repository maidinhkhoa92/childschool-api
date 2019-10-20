const child = require('../../../services/child');
const error = require('../../../helper/error');
const validate = require('./validate');

module.exports.list = {
	handler: (req, res) => {
		const { id, type } = req.decoded;
		
		child.list(null, null, id, type ).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};

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

module.exports.updateNews = {
	Validate: validate.updateNews,
	handler: (req, res) => {
		const {ids, news} = req.body
		
		child.updateNews(news, ids).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};