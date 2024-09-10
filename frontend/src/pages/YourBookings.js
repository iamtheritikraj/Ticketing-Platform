import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import '../Design/YourBookings.css';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/booking/get_bookings',{
        }
        );
        setBookings(response.data.bookings);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Error fetching bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="bookings-container">
      <h3 className="title">Your Bookings</h3>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found</p>
      ) : (
        <ul className="bookings-list">
          {bookings.map((booking) => (
            <li className="booking-card" key={booking._id}>
              <h2 className="event-name">{booking.event.name}</h2>
              <p className="event-date">Date: {new Date(booking.event.date).toLocaleDateString()}</p>
              <p className="seats-booked">Seats Booked: {booking.seats}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBookings;
