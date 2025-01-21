import React from 'react';
import axios from 'axios';

const DeleteDiagnosis = ({ id }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`baseurl/api/diagnoses/${id}`);
      alert('Diagnosis deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Error deleting diagnosis');
    }
  };

  return (
    <div>
      <h2>Delete Diagnosis</h2>
      <button onClick={handleDelete}>Delete Diagnosis</button>
    </div>
  );
};

export default DeleteDiagnosis;