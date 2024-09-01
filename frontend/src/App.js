// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventList from './components/EventList';
import BookEvent from './pages/BookEvent';
import YourBookings from './pages/YourBookings';



const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/bookEvent" element={<BookEvent />} />
      <Route path="/yourBookings" element={<YourBookings />} />
    </Routes>
  </Router>
);

export default App;
