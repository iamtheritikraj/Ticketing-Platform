import React, { useState, useEffect } from 'react';
import axios from "../axiosConfig";
import { useLocation, useNavigate } from 'react-router-dom';
import '../Design/BookEvent.css';

const BookEvent = () => {
  const [seats, setSeats] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginRequired, setLoginRequired] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const { event } = location.state || {};
    if (event) {
      setEventDetails(event);
    }
  }, [location.state]);

  const handleBooking = async () => {
    if (!userEmail) {
      setLoginRequired(true);
      return;
    }

    try {
      const response = await axios.post('/booking/bookEvent', {
        userEmail,
        eventId: eventDetails._id,
        seats,
      });
  
      if (response.data.success) {
        setSuccessMessage(`Successfully booked ${seats} seat(s) for ${eventDetails.name}.`);
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

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="book-event">
      {eventDetails ? (
        <>
          <h1>Book Event: {eventDetails.name}</h1>
          <p>{eventDetails.description}</p>
          <p>Date: {new Date(eventDetails.date).toLocaleDateString()}</p>
          <p>Location: {eventDetails.location}</p>
          <p>Tickets Available: {eventDetails.ticketsAvailable}</p>

          {loginRequired && (
            <div>
              <p className="error-message">Please log in to book a ticket.</p>
              <button className="login-redirect-button" onClick={handleLoginRedirect}>
                Go to Login
              </button>
            </div>
          )}

          <input
            type="number"
            className="seats-input"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            min="1"
            max={eventDetails.ticketsAvailable}
            placeholder="Number of Seats"
            disabled={loginRequired}
          />
          <button
            className="confirm-booking-button"
            onClick={handleBooking}
            disabled={loginRequired}
          >
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
