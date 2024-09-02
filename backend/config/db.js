const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Event = require('../models/Event'); 

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    const filePath = path.join(__dirname, '../events.json'); 
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const eventsData = JSON.parse(jsonData);

    for (const eventData of eventsData) {
      const existingEvent = await Event.findOne({ name: eventData.name });
      if (!existingEvent) {
        const event = new Event(eventData);
        await event.save();
      } 
    }

    console.log('All events have been processed.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
