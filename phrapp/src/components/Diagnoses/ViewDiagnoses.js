import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewDiagnoses = () => {
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get('baseurl/api/diagnoses');
        setDiagnoses(response.data);
      } catch (error) {
        console.error(error);
        alert('Error fetching diagnoses');
      }
    };

    fetchDiagnoses();
  }, []);

  return (
    <div>
      <h2>View Diagnoses</h2>
      <ul>
        {diagnoses.map((diagnosis) => (
          <li key={diagnosis.id}>
            {diagnosis.person_id} - {diagnosis.lab_tests.join(', ')} - {diagnosis.imaging.join(', ')}
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewDiagnoses;