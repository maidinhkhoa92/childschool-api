const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const schema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'user' },
    to: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    classes: [{ type: Schema.Types.ObjectId, ref: 'classes' }],
    type: {
		type: String,
		enum: ['class', 'user'],
		required: true,
		default: 'user',
	},
	message: String,
	firestore: String,
})

schema.plugin(timestamp, {
	createdName: 'created_at',
	updatedName: 'updated_at',
	disableCreated: false,
	disableUpdated: false
});

const message = mongoose.model('message', schema);

module.exports = message;
