import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader';

const ViewHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('/api/hospitalvisitentries');
        const data = response.data.data; // Access the data field within the response object
        const uniqueHospitals = Array.from(new Set(data.map(visit => visit.hospital.id)))
          .map(id => data.find(visit => visit.hospital.id === id).hospital);
        setHospitals(uniqueHospitals);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        setHospitals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="App-content">
      {loading && <Loader />}
      <h2>Hospitals</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Telephone</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.id}>
              <td>{hospital.id}</td>
              <td>{hospital.name}</td>
              <td>{hospital.address}</td>
              <td>{hospital.telephone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewHospitals;