const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const schema = new Schema({
	email: {
		type: String,
		unique: true
	},
	password: String,
	digit: Array,
	typeOfUser: {
		type: String,
		enum: ['director', 'staff', 'family'],
		required: true,
		default: 'family',
	},
	active: {
		type: String,
		enum: ['Pass confirmed', 'Digit confirmed', 'New'],
		required: true,
		default: 'New',
	},
	profile: Object,
	directorId: { type: Schema.Types.ObjectId, ref: 'user' },
	status: {
		type: Boolean,
		required: true,
		default: true,
	},
	completed: {
		type: Boolean,
		required: true,
		default: false,
	},
})

schema.plugin(timestamp, {
	createdName: 'created_at',
	updatedName: 'updated_at',
	disableCreated: false,
	disableUpdated: false
});

const user = mongoose.model('user', schema);

module.exports = user;
