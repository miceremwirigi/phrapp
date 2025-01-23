import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader'; // Ensure this path is correct

const ViewHeartRateEntries = () => {
  const [heartRateEntries, setHeartRateEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeartRateEntries = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/mwirigiheartratemonitor`);
        const data = response.data.data; // Access the data field within the response object
        setHeartRateEntries(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching heart rate entries:', error);
        setLoading(false);
      }
    };

    fetchHeartRateEntries();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString.split(' ')[0]);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString.split(' ')[0]);
    const options = { weekday: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const time = dateString.split(' ')[1];
    const date = new Date(`1970-01-01T${time}Z`);
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div className="view-heart-rate-entries">
      <button className="cancel-button" onClick={() => navigate('/')}>X</button>
      <h2>Heart Rate Entries</h2>
      <div className="table-container">
        <table className="sticky-header">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Day</th>
              <th>Time</th>
              <th>First Name</th>
              <th>Heart Rate</th>
            </tr>
          </thead>
          <tbody>
            {heartRateEntries.map(entry => (
              <tr key={entry.id}>
                <td>{entry.id.slice(0, 8)}</td>
                <td>{formatDate(entry.recorded_at)}</td>
                <td>{formatDay(entry.recorded_at)}</td>
                <td>{formatTime(entry.recorded_at)}</td>
                <td>{entry.person.first_name}</td>
                <td>{entry.heart_rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        <button className="add-button" onClick={() => navigate('/add-heart-rate-entry')}>Add</button>
      </div>
    </div>
  );
};

export default ViewHeartRateEntries;