import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'; // Ensure you have moment.js installed
import CancelButton from '../Common/CancelButton';

const AddPersonForm = ({onSubmit}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    person_id: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    is_dependent: false,
  });

  const [dependantData, setDependantData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/check-auth', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Response:', response); // Log the response to debug
        if (response.data && response.data.data.personId && response.data.data.username) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            person_id: response.data.data.personId,
            first_name: response.data.data.username, // Adjust this based on your response structure
          }));
        } else {
          console.error('Invalid response structure:', response.data);
          navigate('/signin'); // Redirect to signin if not authenticated
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
        navigate('/signin'); // Redirect to signin if error occurs
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDependantChange = (e) => {
    const { name, value } = e.target;
    setDependantData({
      ...dependantData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedFormData = {
      ...formData,
      date_of_birth: moment(formData.date_of_birth).format(),
    };
    const formattedDependantData = {
      ...dependantData,
      date_of_birth: moment(dependantData.date_of_birth).format(),
    };
    const dataToSubmit = formData.is_dependent
      ? { ...formattedFormData, dependants: [formattedDependantData] }
      : formattedFormData;

    onSubmit(dataToSubmit);
  };

  return (
    <div>
      <h2>Add Person</h2>
      <form onSubmit={handleSubmit}>
      <CancelButton />
        <div>
          <label>Person ID:</label>
          <input type="text" name="person_id" value={formData.person_id} readOnly />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="is_dependent"
              checked={formData.is_dependent}
              onChange={handleChange}
            />
            Is Dependent
          </label>
        </div>
        {formData.is_dependent && (
          <div>
            <h3>Add Dependant</h3>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                value={dependantData.first_name}
                onChange={handleDependantChange}
                required
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={dependantData.last_name}
                onChange={handleDependantChange}
                required
              />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input
                type="date"
                name="date_of_birth"
                value={dependantData.date_of_birth}
                onChange={handleDependantChange}
                required
              />
            </div>
          </div>
        )}
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default AddPersonForm;
