const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const schema = new Schema({
    description: String,
    time: String,
	childId: { type: Schema.Types.ObjectId, ref: 'child' }
})

schema.plugin(timestamp, {
	createdName: 'created_at',
	updatedName: 'updated_at',
	disableCreated: false,
	disableUpdated: false
});

const note = mongoose.model('note', schema);

module.exports = note;
