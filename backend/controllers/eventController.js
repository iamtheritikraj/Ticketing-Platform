const Event = require('../models/Event');

const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

module.exports = { getEvents};

