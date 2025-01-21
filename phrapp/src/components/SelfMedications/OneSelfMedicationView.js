import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OneSelfMedicationView = () => {
  const { id } = useParams();
  const [selfMedication, setSelfMedication] = useState(null);

  useEffect(() => {
    const fetchSelfMedication = async () => {
      try {
        const response = await axios.get(`/api/selfmedicationentries/${id}`);
        const data = response.data.data; // Access the data field within the response object
        setSelfMedication(data);
      } catch (error) {
        console.error('Error fetching self-medication:', error);
      }
    };

    fetchSelfMedication();
  }, [id]);

  if (!selfMedication) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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