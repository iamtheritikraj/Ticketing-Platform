// models/Event.js

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  ticketsAvailable: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
