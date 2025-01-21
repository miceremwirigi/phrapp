import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MultiStepForm from './MultiStepForm';

const UpdateSelfMedicationForm = ({ id }) => {
  const [formData, setFormData] = useState({
    medication_name: '',
    dosage: '',
    frequency: '',
    start_date: '',
    end_date: '',
    notes: '',
  });

  useEffect(() => {
    const fetchSelfMedication = async () => {
      try {
        const response = await axios.get(`/api/selfmedicationentries/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching self-medication:', error);
      }
    };

    fetchSelfMedication();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/selfmedicationentries/${id}`, formData);
      alert('Self medication updated successfully');
    } catch (error) {
      console.error('Error updating self medication:', error);
      alert('Error updating self medication');
    }
  };

  return (
    <div>
      <h2>Update Self Medication</h2>
      <MultiStepForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateSelfMedicationForm;