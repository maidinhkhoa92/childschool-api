const classes = require('../../../services/classes');
const user = require('../../../services/user');
const child = require('../../../services/child');
const error = require('../../../helper/error');
const validate = require('./validate');

module.exports.list = {
	handler: (req, res, next) => {
		const { id, type } = req.decoded;
		
		classes.list(null, null, id, type).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
};

module.exports.create = {
	Validate: validate.create,
	handler: (req, res, next) => {
		const body = req.body;
        const { id } = req.decoded;
		
		classes.create(id, body).then(Note => {
			res.status(200).send(Note);
		}).catch(err => {
			next(err);
		});
	}
};

module.exports.addClass = {
	Validate: validate.update,
	handler: (req, res, next) => {
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
			child.create(params).then(Child => {
				classes.addClass(id, Child.id, firstTeacher, secondTeacher, data.id).then(Classes => {
					res.status(200).send(Classes);
				}).catch(e =>{
					error(res.boom, e);
				})
			}).catch(e =>{
				error(res.boom, e);
			})
		}).catch(err => {
			next(err);
		})
	}
};

module.exports.removeClass = {
	Validate: validate.removeClass,
	handler: (req, res, next) => {
		const { class_id, child_id } = req.params;
		classes.removeClass(class_id, child_id).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
}

module.exports.detail = {
	handler: (req, res, next) => {
		const user_id = req.decoded.id;
		const type = req.decoded.type;
		const { id } = req.params;
		
		classes.detail(id, user_id, type).then(Note => {
			res.status(200).send(Note);
		}).catch(err => {
			next(err);
		});
	}
};

module.exports.updateInfor = {
	Validate: validate.updateInfor,
	handler: (req, res, next) => {
		const { id } = req.params;
		const userId = req.decoded.id;
		const body = req.body;
		
		classes.update(id, userId, body).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
};

module.exports.remove = {
	handler: (req, res, next) => {
		const { id } = req.params;
		
		classes.remove(id).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
};