import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../Design/loginPage.css'; // Make sure to create this CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/users/login', { email, password });
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userEmail', data.email);
      navigate('/profile'); // Redirect to profile page after successful login
    } catch (error) {
      console.error('Error logging in', error);
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      <h2 align="center">Ticket App Login</h2>
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
