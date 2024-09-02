import React, { useState, useEffect } from 'react';
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';
import '../Design/eventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events/getEvents');
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleBookEvent = (event) => {
    navigate('/bookEvent', { state: { event } }); 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="event-list">
      <div className="event-cards">
        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          events.map((event) => (
            <div className="event-card" key={event._id}>
              <h2 className="event-title">{event.name}</h2>
              <p className="event-description">{event.description}</p>
              <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="event-location">Location: {event.location}</p>
              <p className="event-tickets">Tickets Available: {event.ticketsAvailable}</p>
              <button className="book-button" onClick={() => handleBookEvent(event)}>Book Now</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;
