const User = require('../models/User');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, age, phone, gender } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name,
    email,
    phone,
    age,
    gender,
    password,
  });
  

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
// controllers/userController.js

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const getUserBookings = async (req, res) => {
  try {
    const userEmail = req.user.email;

    if (!userEmail) {
      return res.status(400).json({ success: false, message: 'Login First' });
    }

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




module.exports = { registerUser, loginUser, getUserProfile, getUserBookings };
