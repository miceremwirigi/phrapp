import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MultiStepForm from './MultiStepForm';

const UpdateHospitalVisitForm = ({ id }) => {
  const [formData, setFormData] = useState({
    visit_date: '',
    reason: '',
    doctor: '',
    notes: '',
    hospitalId: '',
    diagnosis: [],
    treatment: [],
  });

  useEffect(() => {
    const fetchHospitalVisit = async () => {
      try {
        const response = await axios.get(`/api/hospitalvisitentries/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching hospital visit:', error);
      }
    };

    fetchHospitalVisit();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/hospitalvisitentries/${id}`, formData);
      alert('Hospital visit updated successfully');
    } catch (error) {
      console.error('Error updating hospital visit:', error);
      alert('Error updating hospital visit');
    }
  };

  return (
    <div>
      <h2>Update Hospital Visit</h2>
      <MultiStepForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateHospitalVisitForm;