const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const Schema = mongoose.Schema;

const schema = new Schema({
  title: String,
  note: [String],
  type: {
    type: String,
    enum: [
      "Bathroom",
      "Photo",
      "Video",
      "Foods",
      "FeedingBottle",
      "Achievements",
      "CheerUp",
      "Siesta",
      "Medicines",
      "Incidents"
    ],
    default: "text"
  },
  content: String
});

schema.plugin(timestamp, {
  createdName: "created_at",
  updatedName: "updated_at",
  disableCreated: false,
  disableUpdated: false
});

const news = mongoose.model("new", schema);

module.exports = news;
