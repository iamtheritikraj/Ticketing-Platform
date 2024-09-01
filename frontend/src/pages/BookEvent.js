import React, { useState } from 'react';
import axios from "../axiosConfig";
import { useLocation } from 'react-router-dom';
import '../Design/BookEvent.css';

const BookEvent = () => {
  const [seats, setSeats] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const { event } = location.state || {}; // Destructure to get the event details passed from EventList

  // Retrieve the user email from localStorage after successful login
  const userEmail = localStorage.getItem('userEmail');

  const handleBooking = async () => {
    try {
      const response = await axios.post('/events/bookEvent', {
        userEmail,
        eventId: event._id,
        seats,
      });
  
      if (response.data.success) {
        setSuccessMessage(`Successfully booked ${seats} seat(s) for ${event.name}.`);
        setErrorMessage('');
      } else {
        setErrorMessage(response.data.message || 'Failed to book event. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error booking event. Please try again.');
      setSuccessMessage('');
      console.error('Booking error:', error);
    }
  };
  return (
    <div className="book-event">
      {event ? (
        <>
          <h1>Book Event: {event.name}</h1>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>Location: {event.location}</p>
          <p>Tickets Available: {event.ticketsAvailable}</p>

          <input
            type="number"
            className="seats-input"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            min="1"
            max={event.ticketsAvailable}
            placeholder="Number of Seats"
          />
          <button className="confirm-booking-button" onClick={handleBooking}>
            Confirm Booking
          </button>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      ) : (
        <p>No event selected. Please go back and select an event.</p>
      )}
    </div>
  );
};

export default BookEvent;
