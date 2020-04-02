const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  imgLink: {
    type: String
  },
  link: {
    type: String
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
