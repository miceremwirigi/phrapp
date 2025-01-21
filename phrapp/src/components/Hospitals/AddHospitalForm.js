import React, { useState } from 'react';
import CancelButton from '../Common/CancelButton';

const HospitalForm = ({ onSubmit, onPrevious }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
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
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CancelButton />
      <div>
        <label>Hospital Name:</label>
        <h2>Add Hospital</h2>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <button type="button" onClick={onPrevious}>Previous</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default HospitalForm;