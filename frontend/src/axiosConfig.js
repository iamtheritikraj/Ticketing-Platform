import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // Ensure credentials (like cookies) are sent with requests
});

export default instance;
