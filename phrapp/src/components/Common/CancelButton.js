import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CancelButton.css'; // Ensure you create this CSS file for styling

const CancelButton = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/view-hospital-visits');
  };

  return (
    <button className="cancel-button" onClick={handleCancel}>
      X
    </button>
  );
};

export default CancelButton;