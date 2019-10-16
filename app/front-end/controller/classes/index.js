const classes = require('../../../services/classes');
const user = require('../../../services/user');
const child = require('../../../services/child');
const error = require('../../../helper/error');
const validate = require('./validate');

module.exports.list = {
	handler: (req, res) => {
		const { id, type } = req.decoded;
		
		classes.list(null, null, id, type).then(Data => {
			res.status(200).send(Data);
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
		
		classes.create(id, body).then(Note => {
			res.status(200).send(Note);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};

module.exports.addClass = {
	Validate: validate.update,
	handler: (req, res) => {
		const {children, firstTeacher, secondTeacher, family} = req.body;
		const user_id = req.decoded.id;
		const { id } = req.params;
		const params1 = {
			email: firstTeacher.email,
			typeOfUser: "staff",
			profile: firstTeacher.profile
		}
		const params2 = {
			email: secondTeacher.email,
			typeOfUser: "staff",
			profile: secondTeacher.profile
		}
		const params3 = {
			email: family.email,
			typeOfUser: "family",
			profile: family.profile
		}

		Promise.all([
			user.findByEmailAndCreate(params1, user_id), 
			user.findByEmailAndCreate(params2, user_id), 
			user.findByEmailAndCreate(params3, user_id)
		])
		.then(data => {
			const params = {
				profile: children,
				firstTeacher: data[0].id,
				secondTeacher: data[1].id,
				family: data[2].id,
				directorId: user_id
			}
			child.create(params).then(Child => {
				classes.addClass(id, Child.id, data[0].id, data[1].id, data[2].id).then(Classes => {
					res.status(200).send(Classes);
				}).catch(e =>{
					console.log(e)
					error(res.boom, e);
				})
			}).catch(e =>{
				error(res.boom, e);
			})
		}).catch(err => {
			error(res.boom, err);
		})
	}
};

module.exports.removeClass = {
	Validate: validate.removeClass,
	handler: (req, res) => {
		const { childId } = req.body;
		const { id } = req.params;
		classes.removeClass(id, childId).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
}

module.exports.detail = {
	handler: (req, res) => {
		const user_id = req.decoded.id;
		const type = req.decoded.type;
		const { id } = req.params;
		
		classes.detail(id, user_id, type).then(Note => {
			res.status(200).send(Note);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};

module.exports.updateInfor = {
	Validate: validate.updateInfor,
	handler: (req, res) => {
		const { id } = req.params;
		const userId = req.decoded.id;
		const body = req.body;
		
		classes.update(id, userId, body).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};