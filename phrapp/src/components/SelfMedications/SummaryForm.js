import React, { useState } from 'react';
import CancelButton from '../Common/CancelButton';

const SummaryForm = ({ personData, diagnosisData, treatmentData, onSubmit, onPrevious }) => {
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    summaryReason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CancelButton />
      <h2>Summary</h2>
      <div>
        <h3>Person Information</h3>
        <p>First Name: {personData.first_name}</p>
        <p>Last Name: {personData.last_name}</p>
        <p>Date of Birth: {personData.date_of_birth}</p>
      </div>
      <div>
        <h3>Diagnosis Information</h3>
        <p>Lab Tests: {diagnosisData?.labTests?.join(', ')}</p>
        <p>Imaging: {diagnosisData?.imaging?.join(', ')}</p>
        <p>Illnesses: {diagnosisData?.illnesses?.map(illness => illness.illness_name).join(', ')}</p>
      </div>
      <div>
        <h3>Treatment Information</h3>
        <p>Medication: {treatmentData?.medication?.join(', ')}</p>
        <p>Therapy: {treatmentData?.therapy?.join(', ')}</p>
        <p>Surgery: {treatmentData?.surgery?.join(', ')}</p>
      </div>
      <div>
        <h3>Self Medication Summary</h3>
        <label>Start Date:</label>
        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
      </div>
      <div>
        <label>Summary Reason:</label>
        <textarea name="summaryReason" value={formData.summaryReason} onChange={handleChange} required></textarea>
      </div>
      <button type="button" onClick={onPrevious}>Previous</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SummaryForm;