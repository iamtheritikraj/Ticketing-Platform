import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import '../Design/header.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/users/logout');
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/users/check-auth');
        if (response.status === 200 && response.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);

        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  });

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo-container">
          <Link to="/" className="logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
              className="ticket-logo"
            >
              <path d="M20 10.8v2.4c1.12.36 2 1.44 2 2.76 0 1.66-1.34 3-3 3-1.32 0-2.4-.88-2.76-2H7.76c-.36 1.12-1.44 2-2.76 2-1.66 0-3-1.34-3-3 0-1.32.88-2.4 2-2.76V10.8c-1.12-.36-2-1.44-2-2.76 0-1.66 1.34-3 3-3 1.32 0 2.4.88 2.76 2h8.48c.36-1.12 1.44-2 2.76-2 1.66 0 3 1.34 3 3 0 1.32-.88 2.4-2 2.76z" />
            </svg>
            <span className="logo-text">BookYourTicket</span>
          </Link>
        </div>
        <ul className="nav-links">
          {isAuthenticated ? (
            <>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/yourBookings">Your Bookings</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
