import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OneHospitalVisitView = () => {
  const { id } = useParams();
  const [hospitalVisit, setHospitalVisit] = useState(null);

  useEffect(() => {
    const fetchHospitalVisit = async () => {
      try {
        const response = await axios.get(`/api/hospitalvisitentries/${id}`);
        const data = response.data.data; // Access the data field within the response object
        setHospitalVisit(data);
      } catch (error) {
        console.error('Error fetching hospital visit:', error);
      }
    };

    fetchHospitalVisit();
  }, [id]);

  if (!hospitalVisit) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Hospital Visit Details</h2>
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
            <td>{hospitalVisit.id}</td>
          </tr>
          <tr>
            <td>Person</td>
            <td>{hospitalVisit.person.first_name} {hospitalVisit.person.last_name}</td>
          </tr>
          <tr>
            <td>Hospital</td>
            <td>{hospitalVisit.hospital.name}</td>
          </tr>
          <tr>
            <td>Diagnosis</td>
            <td>{hospitalVisit.diagnosis.illnesses ? hospitalVisit.diagnosis.illnesses.map(i => i.illness_name).join(', ') : 'N/A'}</td>
          </tr>
          <tr>
            <td>Treatment</td>
            <td>
              {hospitalVisit.treatment.medication ? hospitalVisit.treatment.medication.join(', ') : 'N/A'}<br />
              {hospitalVisit.treatment.therapy ? hospitalVisit.treatment.therapy.join(', ') : 'N/A'}<br />
              {hospitalVisit.treatment.surgery ? hospitalVisit.treatment.surgery.join(', ') : 'N/A'}
            </td>
          </tr>
          <tr>
            <td>Admission Date</td>
            <td>{hospitalVisit.start_date}</td>
          </tr>
          <tr>
            <td>Checkout Date</td>
            <td>{hospitalVisit.end_date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OneHospitalVisitView;