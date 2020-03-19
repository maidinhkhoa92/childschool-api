const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const Schema = mongoose.Schema;

const schema = new Schema({
  note: { type: String, default: "" },
  datePaid: Date,
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Open'],
    required: true,
    default: 'Completed',
  },
  director: { type: Schema.Types.ObjectId, ref: 'user' },
});

schema.plugin(timestamp, {
  createdName: "created_at",
  updatedName: "updated_at",
  disableCreated: false,
  disableUpdated: false
});

const news = mongoose.model("payment", schema);

module.exports = news;
