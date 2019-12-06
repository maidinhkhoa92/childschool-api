const child = require('../../../services/child');
const user = require('../../../services/user');
const error = require('../../../helper/error');
const validate = require('./validate');

module.exports.list = {
	handler: (req, res) => {
		const { id, type } = req.decoded;
		const { class_id } = req.query;
		child.list(null, null, id, type, class_id ).then(Data => {
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

module.exports.updateStatus = {
	Validate: validate.updateStatus,
	handler: (req, res) => {
		const { id } = req.params;
		
		child.updateStatus(req.body, id).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};

module.exports.updateChildPerson = {
	Validate: validate.updateChildPerson,
	handler: (req, res) => {
		const {children, firstTeacher, secondTeacher, family} = req.body;
		const user_id = req.decoded.id;
		const { id } = req.params;

		const family_body = {
			email: family.email,
			typeOfUser: "family",
			profile: family.profile
		}

		user.findByEmailAndCreate(family_body, user_id).then(data => {
			const params = {
				profile: children,
				firstTeacher: firstTeacher,
				secondTeacher: secondTeacher,
				family: data.id,
				directorId: user_id
			}
			child.updateAll(id, params).then(Child => {
				res.status(200).send(Child);
			}).catch(e =>{
				error(res.boom, e);
			})
		}).catch(err => {
			error(res.boom, err);
		})
	}
};

module.exports.search = {
	Validate: validate.search,
	handler: (req, res) => {
		const { word } = req.body;
		const { id, type } = req.decoded;
		child.search(word, id, type).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};