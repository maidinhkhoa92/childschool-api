const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {
		type: String,
		unique: true
	},
	firstName: String,
	lastName: String,
	telephone: String,
	typeOfUser: {
		type: String,
		enum: ['director', 'staff', 'family'],
		required: true,
		default: 'family',
	},
	registed: {
		type: Boolean,
		default: false
	}
})

schema.plugin(timestamp, {
	createdName: 'created_at',
	updatedName: 'updated_at',
	disableCreated: false,
	disableUpdated: false
});

const contact = mongoose.model('contact', schema);

module.exports = contact;
