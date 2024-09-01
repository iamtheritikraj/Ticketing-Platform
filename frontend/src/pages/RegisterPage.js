import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../Design/registerPage.css'; // Make sure to create this CSS file

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/users/register', { name, email, phone, age, gender, password });
      localStorage.setItem('authToken', data.token); // Store the token in localStorage
      navigate('/profile'); // Navigate to the Profile page on successful registration
    } catch (error) {
      console.error('Error registering user', error);
      alert('Error during registration. Please try again.');
    }
  };

  return (
    <div>
      <h2 align="center">Ticket App Register</h2>
      <div className="register-container">
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="register-input"
          />
          <div className="gender-group">
            <label>
              <input
                type="radio"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                value="other"
                checked={gender === 'other'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Other
            </label>
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
