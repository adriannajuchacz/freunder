const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  location: {
    type: String
  },
  date: {
    type: Date,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  attendees: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  ]
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
