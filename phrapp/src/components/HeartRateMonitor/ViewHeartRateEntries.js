import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
// import './ViewHeartRateEntries.css';

const ViewHeartRateEntries = () => {
  const [heartRateEntries, setHeartRateEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeartRateEntries = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/mwirigiheartratemonitor`);
        setHeartRateEntries(response.data.data);
      } catch (error) {
        console.error('Error fetching heart rate entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeartRateEntries();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="App-content">
      {loading && <Loader />}
      <div className="sticky-button-container">
        <button className="sticky-button" onClick={handleBack}>&lt; Back</button>
      </div>
      <h2>Heart Rate Entries</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Person</th>
            <th>Heart Rate</th>
            <th>Recorded At</th>
          </tr>
        </thead>
        <tbody>
          {heartRateEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.person.first_name} {entry.person.last_name}</td>
              <td>{entry.heart_rate}</td>
              <td>{new Date(entry.recorded_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewHeartRateEntries;