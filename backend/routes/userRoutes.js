const express = require('express');
const { registerUser, loginUser, getUserProfile, getUserBookings } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Add this route to fetch user profile details
router.get('/profile', protect, getUserProfile);
router.get('/bookings', protect, getUserBookings);

module.exports = router;
