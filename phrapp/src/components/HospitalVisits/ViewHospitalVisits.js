import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

const ViewHospitalVisits = () => {
  const [hospitalVisits, setHospitalVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitalVisits = async () => {
      try {
        const response = await axios.get('/api/hospitalvisitentries');
        const data = response.data.data; // Access the data field within the response object
        if (Array.isArray(data)) {
          setHospitalVisits(data);
        } else {
          console.error('Unexpected response data format:', data);
          setHospitalVisits([]);
        }
      } catch (error) {
        console.error('Error fetching hospital visits:', error);
        setHospitalVisits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalVisits();
  }, []);

  const handleRowClick = (id) => {
    setLoading(true);
    navigate(`/hospital-visit/${id}`);
  };

  const handleAddHospitalVisit = () => {
    setLoading(true);
    navigate('/add-hospital-visit');
  };

  const handleBack = () => {
    setLoading(true);
    navigate(-1);
  };

  return (
    <div className="App-content">
      {loading && <Loader />}
      <h2>Hospital Visits</h2>
      <button onClick={handleAddHospitalVisit}>Add Hospital Visit</button>
      <button onClick={handleBack} className="back-button">Back</button>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Person</th>
            <th>Hospital</th>
            <th>Reason</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {hospitalVisits.map((visit) => (
            <tr key={visit.id} onClick={() => handleRowClick(visit.id)} style={{ cursor: 'pointer' }}>
              <td>{visit.id}</td>
              <td>{visit.person.first_name} {visit.person.last_name}</td>
              <td>{visit.hospital.name}</td>
              <td>{visit.reason}</td>
              <td>
                {visit.diagnosis.illnesses ? visit.diagnosis.illnesses.map(i => i.illness_name).join(', ') : 'N/A'}
              </td>
              <td>
                {visit.treatment.medication ? visit.treatment.medication.join(', ') : 'N/A'}<br />
                {visit.treatment.therapy ? visit.treatment.therapy.join(', ') : 'N/A'}<br />
                {visit.treatment.surgery ? visit.treatment.surgery.join(', ') : 'N/A'}
              </td>
              <td>{visit.start_date}</td>
              <td>{visit.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewHospitalVisits;