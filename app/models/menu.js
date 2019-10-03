const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const schema = new Schema({
    url: String,
	directorId: { type: Schema.Types.ObjectId, ref: 'user' }
})

schema.plugin(timestamp, {
	createdName: 'created_at',
	updatedName: 'updated_at',
	disableCreated: false,
	disableUpdated: false
});

const menu = mongoose.model('menu', schema);

module.exports = menu;
