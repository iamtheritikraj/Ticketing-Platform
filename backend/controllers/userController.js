const User = require('../models/User');
const Booking = require('../models/Booking');
const Event = require('../models/Event');

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
    req.session.userId = user._id;
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      // Store user ID in the session
      req.session.userId = user._id;
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getUserProfile = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  try {
    const user = await User.findById(req.session.userId);
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
const logoutUser = (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  try {
    // Destroy the session
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Could not log out. Please try again.' });
      }
      
      // Clear the cookie if it's being used
      res.clearCookie('connect.sid'); // Make sure 'connect.sid' matches your session cookie name
      
      // Send a success response
      res.status(200).json({ message: 'Logged out successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { registerUser, loginUser, getUserProfile,logoutUser};
