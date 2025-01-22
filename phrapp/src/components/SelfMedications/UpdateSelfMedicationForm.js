import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MultiStepForm from './MultiStepForm';
import Loader from '../Loader';

const UpdateSelfMedicationForm = ({ id }) => {
  const [formData, setFormData] = useState({
    medication_name: '',
    dosage: '',
    frequency: '',
    start_date: '',
    end_date: '',
    notes: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSelfMedication = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/selfmedicationentries/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching self-medication:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSelfMedication();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/selfmedicationentries/${id}`, formData);
      alert('Self medication updated successfully');
    } catch (error) {
      console.error('Error updating self medication:', error);
      alert('Error updating self medication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <h2>Update Self Medication</h2>
      <MultiStepForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateSelfMedicationForm;