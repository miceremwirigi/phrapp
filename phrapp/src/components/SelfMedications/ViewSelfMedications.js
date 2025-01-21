import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewSelfMedications = () => {
  const [selfMedications, setSelfMedications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSelfMedications = async () => {
      try {
        const response = await axios.get('/api/selfmedicationentries');
        const data = response.data.data; // Access the data field within the response object
        if (Array.isArray(data)) {
          setSelfMedications(data);
        } else {
          console.error('Unexpected response data format:', data);
        }
      } catch (error) {
        console.error('Error fetching self-medications:', error);
      }
    };

    fetchSelfMedications();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/self-medication/${id}`);
  };

  const handleAddSelfMedication = () => {
    navigate('/add-self-medication');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="App-content">
      <h2>Self Medications</h2>
      <button onClick={handleAddSelfMedication}>Add Self Medication</button>
      <button onClick={handleBack} className="back-button">Back</button>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Person</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {selfMedications.map((medication) => (
            <tr key={medication.id} onClick={() => handleRowClick(medication.id)} style={{ cursor: 'pointer' }}>
              <td>{medication.id}</td>
              <td>{medication.person.first_name} {medication.person.last_name}</td>
              <td>{medication.diagnosis.illnesses ? medication.diagnosis.illnesses.map(i => i.illness_name).join(', ') : 'N/A'}</td>
              <td>
                {medication.treatment.medication ? medication.treatment.medication.join(', ') : 'N/A'}<br />
                {medication.treatment.therapy ? medication.treatment.therapy.join(', ') : 'N/A'}<br />
                {medication.treatment.surgery ? medication.treatment.surgery.join(', ') : 'N/A'}
              </td>
              <td>{medication.start_date}</td>
              <td>{medication.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSelfMedications;