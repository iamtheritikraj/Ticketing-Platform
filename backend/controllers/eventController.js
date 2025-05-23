const mongoose = require('mongoose');
const redisClient = require('../config/redis');
const Event = require('../models/Event');



// Cache duration
const CACHE_DURATION = 3600;

const getEvents = async (req, res) => {
  try {
    // Check Redis cache for the events
    const cachedEvents = await redisClient.get('events');

    if (cachedEvents) {
      return res.json(JSON.parse(cachedEvents));
    }

    const events = await Event.find();

    await redisClient.set('events', JSON.stringify(events), {
      EX: CACHE_DURATION, // Expiry time
    });

    console.log('Serving from MongoDB');
    return res.json(events);

  } catch (err) {
    console.error('Error fetching events:', err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getEvents };