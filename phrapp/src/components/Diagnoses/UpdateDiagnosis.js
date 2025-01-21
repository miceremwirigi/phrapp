import React, { useState } from 'react';
import axios from 'axios';

const UpdateDiagnosis = ({ id }) => {
  const [diagnosis, setDiagnosis] = useState({
    person_id: '',
    lab_tests: [],
    imaging: [],
    illnesses: []
  });

  const handleChange = (e) => {
    setDiagnosis({ ...diagnosis, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`baseurl/api/diagnoses/${id}`, diagnosis);
      alert('Diagnosis updated successfully');
    } catch (error) {
      console.error(error);
      alert('Error updating diagnosis');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Diagnosis</h2>
      <input type="text" name="person_id" value={diagnosis.person_id} onChange={handleChange} placeholder="Person ID" />
      {/* Add inputs for lab_tests, imaging, and illnesses */}
      <button type="submit">Update Diagnosis</button>
    </form>
  );
};

export default UpdateDiagnosis;