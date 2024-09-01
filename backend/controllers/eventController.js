const Event = require('../models/Event');
const Booking = require('../models/Booking');

const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

const bookEvent = async (req, res) => {
  const { userEmail, eventId, seats } = req.body;

  if (!userEmail || !eventId || !seats) {
    return res.status(400).json({ success: false, message: 'Required fields are missing' });
  }
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.ticketsAvailable < seats) {
      return res.status(400).json({ success: false, message: 'Not enough tickets available' });
    }

    // Deduct seats from available tickets
    event.ticketsAvailable -= seats;
    await event.save();

    // Create a new booking entry
    const booking = new Booking({
      userEmail,
      event: eventId,
      seats,
    });

    await booking.save();

    res.status(200).json({ success: true, message: 'Event booked successfully', booking });
  } catch (error) {
    console.error('Error booking event:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


module.exports = { getEvents, bookEvent };

