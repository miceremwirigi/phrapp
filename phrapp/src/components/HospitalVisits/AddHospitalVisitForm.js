import React, { useState } from 'react';
import MultiStepForm from './MultiStepForm';
import Loader from '../Loader';

const AddHospitalVisitForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      // Submit form data
    } catch (error) {
      console.error('Error adding hospital visit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <h2>Add Hospital Visit</h2>
      <MultiStepForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddHospitalVisitForm;