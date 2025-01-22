import React, { useState } from 'react';
import axios from 'axios';
import CancelButton from '../Common/CancelButton';

const AddTreatmentForm = ({ onPrevious, onSubmit }) => {
  const [formData, setFormData] = useState({
    medication: '',
    therapy: '',
    surgery: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      medication: formData.medication.split(',').map(med => med.trim()), // Convert to array of strings
      therapy: formData.therapy.split(',').map(ther => ther.trim()), // Convert to array of strings
      surgery: formData.surgery.split(',').map(surg => surg.trim()), // Convert to array of strings
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/treatments`, formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Success:', response.data);
      onSubmit(response.data.data); // Call the onSubmit callback if provided
    } catch (error) {
      console.error('Error:', error);
      window.alert('Unable to save treatment info');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CancelButton />
      <h2>Add Treatment</h2>
      <div>
        <label>Medication:</label>
        <input type="text" name="medication" value={formData.medication} onChange={handleChange} required />
      </div>
      <div>
        <label>Therapy:</label>
        <input type="text" name="therapy" value={formData.therapy} onChange={handleChange} required />
      </div>
      <div>
        <label>Surgery:</label>
        <input type="text" name="surgery" value={formData.surgery} onChange={handleChange} required />
      </div>
      <button type="button" onClick={onPrevious}>Previous</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default AddTreatmentForm;