import React, { useState } from 'react';
import MultiStepForm from './MultiStepForm';
import Loader from '../Loader';

const AddSelfMedicationForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      // Submit form data
    } catch (error) {
      console.error('Error adding self medication:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <h2>Add Self Medication</h2>
      <MultiStepForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddSelfMedicationForm;