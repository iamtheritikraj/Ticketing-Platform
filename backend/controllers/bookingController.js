const User = require('../models/User');
const Booking = require('../models/Booking');
const Event = require('../models/Event');

// Session-based bookEvent function
const bookEvent = async (req, res) => {
  const { eventId, seats } = req.body;

  const user = await User.findById(req.session.userId);
  const userEmail = user.email;

  if (!eventId || !seats) {
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

// Session-based getUserBookings function
const getUserBookings = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const userEmail = user.email;

    // Find bookings by user email
    const bookings = await Booking.find({ userEmail }).populate('event'); // Populate the event field

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ success: false, message: 'No bookings found for this user' });
    }

    // Extract event details for each booking
    const bookingsWithEventDetails = bookings.map(booking => ({
      ...booking.toObject(),
      event: booking.event // Include event details
    }));

    res.status(200).json({ success: true, bookings: bookingsWithEventDetails });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
  
};

module.exports = { getUserBookings, bookEvent };
