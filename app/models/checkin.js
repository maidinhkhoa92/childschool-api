const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const schema = new Schema({
	date: String,
	classes: { type: Schema.Types.ObjectId, ref: 'classes' },
    absent: [{ type: Schema.Types.ObjectId, ref: 'child' }],
    checkin: [{ type: Schema.Types.ObjectId, ref: 'child' }],
	checkout: [{ type: Schema.Types.ObjectId, ref: 'child' }],
})
  
schema.set('toObject', { virtuals: true })

schema.plugin(timestamp, {
	createdName: 'created_at',
	updatedName: 'updated_at',
	disableCreated: false,
	disableUpdated: false
});

const checkin = mongoose.model('checkin', schema);

module.exports = checkin;
