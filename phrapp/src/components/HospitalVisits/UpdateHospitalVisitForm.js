import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MultiStepForm from './MultiStepForm';
import Loader from '../Loader';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitalVisit = async () => {
      try {
        const response = await axios.get(`/api/hospitalvisitentries/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching hospital visit:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalVisit();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/api/hospitalvisitentries/${id}`, formData);
      alert('Hospital visit updated successfully');
    } catch (error) {
      console.error('Error updating hospital visit:', error);
      alert('Error updating hospital visit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <h2>Update Hospital Visit</h2>
      <MultiStepForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateHospitalVisitForm;