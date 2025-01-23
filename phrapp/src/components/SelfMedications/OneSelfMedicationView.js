import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Loader';

const OneSelfMedicationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selfMedication, setSelfMedication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSelfMedication = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/selfmedicationentries/${id}`);
        const data = response.data.data; // Access the data field within the response object
        setSelfMedication(data);
      } catch (error) {
        console.error('Error fetching self-medication:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSelfMedication();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!selfMedication) {
    return <div>No self medication found</div>;
  }

  return (
    <div className="details-view">
      <button className="cancel-button" onClick={() => navigate('/')}>X</button>
      <h2>Self Medication Details</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ID</td>
            <td>{selfMedication.id}</td>
          </tr>
          <tr>
            <td>Person</td>
            <td>{selfMedication.person.first_name} {selfMedication.person.last_name}</td>
          </tr>
          <tr>
            <td>Diagnosis</td>
            <td>{selfMedication.diagnosis.illnesses ? selfMedication.diagnosis.illnesses.map(i => i.illness_name).join(', ') : 'N/A'}</td>
          </tr>
          <tr>
            <td>Treatment</td>
            <td>
              {selfMedication.treatment.medication ? selfMedication.treatment.medication.join(', ') : 'N/A'}<br />
              {selfMedication.treatment.therapy ? selfMedication.treatment.therapy.join(', ') : 'N/A'}<br />
              {selfMedication.treatment.surgery ? selfMedication.treatment.surgery.join(', ') : 'N/A'}
            </td>
          </tr>
          <tr>
            <td>Start Date</td>
            <td>{selfMedication.start_date}</td>
          </tr>
          <tr>
            <td>End Date</td>
            <td>{selfMedication.end_date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OneSelfMedicationView;