import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

const ViewSelfMedications = () => {
  const [selfMedications, setSelfMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSelfMedications = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/selfmedicationentries`);
        const data = response.data.data; // Access the data field within the response object
        if (Array.isArray(data)) {
          setSelfMedications(data);
        } else {
          console.error('Unexpected response data format:', data);
        }
      } catch (error) {
        console.error('Error fetching self-medications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSelfMedications();
  }, []);

  const handleRowClick = (id) => {
    setLoading(true);
    navigate(`/self-medication/${id}`);
  };

  const handleAddSelfMedication = () => {
    setLoading(true);
    navigate('/add-self-medication');
  };

  const handleBack = () => {
    setLoading(true);
    navigate(-1);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="view-self-medications">
      <button className="cancel-button" onClick={() => navigate('/')}>X</button>
      <h2>Self Medications</h2>
      <div className="table-container">
        <table className="sticky-header">
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
      <div className="button-container">
        <button className='back-button' onClick={handleBack}>Back</button>
        <button className='add-button' onClick={handleAddSelfMedication}>Add Self Medication</button>
      </div>
    </div>
  );
};

export default ViewSelfMedications;