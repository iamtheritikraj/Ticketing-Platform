const express = require('express');
const { bookEvent, getUserBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/bookEvent', bookEvent);
router.get('/get_bookings', protect, getUserBookings);

module.exports = router;