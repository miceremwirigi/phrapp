import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

export const checkAuth = async (navigate) => {
  try {
    const response = await axios.get('https://api.personalhealthrecord.store/api/check-auth', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Response:', response); // Log the response to debug
    if (response.data && response.data.data.personId && response.data.data.username) {
      return {
        personId: response.data.data.personId,
        username: response.data.data.username,
      };
    } else {
      console.error('Invalid response structure:', response.data);
      navigate('/signin'); // Redirect to signin if not authenticated
      return null;
    }
  } catch (error) {
    console.error('Error checking auth:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    navigate('/signin'); // Redirect to signin if error occurs
    return null;
  }
};