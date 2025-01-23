import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader'; // Ensure this path is correct

const ViewHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/hospitalvisitentries`);
        const data = response.data.data; // Access the data field within the response object
        setHospitals(data.map(entry => entry.hospital));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="view-hospitals">
      <button className="cancel-button" onClick={() => navigate('/')}>X</button>
      <h2>Hospitals</h2>
      <div className="table-container">
        <table className="sticky-header">
          <thead>
            <tr>
              <th>Name</th>
              <th>Telephone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map(hospital => (
              <tr key={hospital.id}>
                <td>{hospital.name}</td>
                <td>{hospital.telephone || 'N/A'}</td>
                <td>{hospital.address || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        <button className="add-button" onClick={() => navigate('/add-hospital')}>Add</button>
      </div>
    </div>
  );
};

export default ViewHospitals;