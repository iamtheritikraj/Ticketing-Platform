// routes/eventRoutes.js
const express = require('express');
const { getEvents, bookEvent } = require('../controllers/eventController');
const router = express.Router();

// Define your routes here
router.get('/getEvents', getEvents);
router.post('/bookEvent', bookEvent);


module.exports = router;

