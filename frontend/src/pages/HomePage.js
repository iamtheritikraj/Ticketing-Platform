import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import EventList from '../components/EventList';
import BannerSlider from '../components/BannerSlider';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get('/events/getEvents');
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <BannerSlider />
      <EventList events={events} />
    </div>
  );
};

export default HomePage;
