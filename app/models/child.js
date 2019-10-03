const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const schema = new Schema({
	avatar: String,
	profile: Object,
    firstTeacher: { type: Schema.Types.ObjectId, ref: 'user' },
    secondTeacher: { type: Schema.Types.ObjectId, ref: 'user' },
	family: { type: Schema.Types.ObjectId, ref: 'user' },
	directorId: { type: Schema.Types.ObjectId, ref: 'user' },
	news: [
		{
			title: String,
			note: [String],
			type: {
				type: String,
				enum: ['text', 'video', 'image'],
				default: 'text',
			},
			content: String,
		}
	]
})

schema.plugin(timestamp, {
	createdName: 'created_at',
	updatedName: 'updated_at',
	disableCreated: false,
	disableUpdated: false
});

const child = mongoose.model('child', schema);

module.exports = child;
