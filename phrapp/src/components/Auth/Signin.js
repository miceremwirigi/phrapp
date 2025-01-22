import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin = ({ setIsLoggedIn, setUsername }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/login`, formData, {
        withCredentials: true,
      });
      console.log('API Response:', response.data); // Add this line to log the API response

      // Wait a moment to ensure the cookie is set
      setTimeout(async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/check-auth`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Response:', response); // Log the response to debug

        if (response.data && response.data.data.personId && response.data.data.username) {
          setIsLoggedIn(true);
          setUsername(response.data.data.username);
          setMessage('Signin successful');
          navigate('/');
        } else {
          setMessage('Signin failed!');
          navigate('/signin'); // Redirect to signin if not authenticated
        }
      }, 1000); // Add a delay to ensure the cookie is set
    } catch (error) {
      console.error('Signin error:', error); // Add this line to log the error
      setMessage('Error signing in. Please try again.');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;