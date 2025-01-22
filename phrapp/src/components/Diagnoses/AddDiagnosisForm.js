import React, { useState } from 'react';
import axios from 'axios';
import CancelButton from '../Common/CancelButton';

const AddDiagnosisForm = ({ personId, onPrevious, onSubmit }) => {
  const [formData, setFormData] = useState({
    labTests: '',
    imaging: '',
    illnesses: [{
      illness_name: '',
      symptoms: '',
      signs: '',
    }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIllnessChange = (index, e) => {
    const { name, value } = e.target;
    const newIllnesses = [...formData.illnesses];
    newIllnesses[index][name] = value;
    setFormData({
      ...formData,
      illnesses: newIllnesses,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create illnesses first
      const illnessPromises = formData.illnesses.map(illness => {
        const formattedIllness = {
          ...illness,
          symptoms: illness.symptoms.split(',').map(symptom => symptom.trim()), // Convert to array of strings
          signs: illness.signs.split(',').map(sign => sign.trim()), // Convert to array of strings
        };
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/illnesses`, formattedIllness, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      });

      const illnessResponses = await Promise.all(illnessPromises);
      const illnessIds = illnessResponses.map(response => response.data.data.id);

      // Create diagnosis with illness IDs
      const formattedData = {
        ...formData,
        personId, // Include the personId
        labTests: formData.labTests.split(',').map(test => test.trim()), // Convert to array of strings
        imaging: formData.imaging.split(',').map(image => image.trim()), // Convert to array of strings
        illnesses: illnessIds.map(id => ({ id })),
      };

      // const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/diagnoses`, formattedData, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // console.log('Success:', response.data);
      onSubmit(formattedData); // Call the onSubmit callback if provided
    } catch (error) {
      console.error('Error:', error);
      window.alert('Unable to save diagnosis info');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CancelButton />
      <h2>Add Diagnosis</h2>
      <div>
        <label>Lab Tests:</label>
        <input type="text" name="labTests" value={formData.labTests} onChange={handleChange} required />
      </div>
      <div>
        <label>Imaging:</label>
        <input type="text" name="imaging" value={formData.imaging} onChange={handleChange} required />
      </div>
      {formData.illnesses.map((illness, index) => (
        <div key={index}>
          <div>
            <label>Illness Name:</label>
            <input type="text" name="illness_name" value={illness.illness_name} onChange={(e) => handleIllnessChange(index, e)} required />
          </div>
          <div>
            <label>Symptoms:</label>
            <input type="text" name="symptoms" value={illness.symptoms} onChange={(e) => handleIllnessChange(index, e)} required />
          </div>
          <div>
            <label>Signs:</label>
            <input type="text" name="signs" value={illness.signs} onChange={(e) => handleIllnessChange(index, e)} required />
          </div>
        </div>
      ))}
      <button type="button" onClick={onPrevious}>Previous</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default AddDiagnosisForm;