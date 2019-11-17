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
	classes: { type: Schema.Types.ObjectId, ref: 'classes' },
	news: [{ type: Schema.Types.ObjectId, ref: 'new' }],
	sleeping: {
		type: Boolean,
		required: true,
		default: false,
	},
})

schema.virtual('id').get(function(){
	return this._id.toHexString();
});
  
schema.set('toObject', { virtuals: true })

schema.plugin(timestamp, {
	createdName: 'created_at',
	updatedName: 'updated_at',
	disableCreated: false,
	disableUpdated: false
});

const child = mongoose.model('child', schema);

module.exports = child;
