const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const schema = new Schema({
	name: String,
	group: { type: Schema.Types.ObjectId, ref: 'classes' },
	note: String,
	date: Date,
	startTime: String,
	endTime: String
})

schema.plugin(timestamp, {
	createdName: 'created_at',
	updatedName: 'updated_at',
	disableCreated: false,
	disableUpdated: false
});

const event = mongoose.model('event', schema);

module.exports = event;
