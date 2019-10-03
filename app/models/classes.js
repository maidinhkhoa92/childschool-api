const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const schema = new Schema({
	name: String,
	color: String,
	child: [{ type: Schema.Types.ObjectId, ref: 'child' }],
	directorId: { type: Schema.Types.ObjectId, ref: 'user' }
})

schema.plugin(timestamp, {
	createdName: 'created_at',
	updatedName: 'updated_at',
	disableCreated: false,
	disableUpdated: false
});

const classes = mongoose.model('classes', schema);

module.exports = classes;
