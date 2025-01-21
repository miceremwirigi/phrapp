import React, { useEffect, useState } from 'react';
import './Heartrate.css';

const Heartrate = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://phr-backend.onrender.com/api/heartmonitorentries')
      .then(response => response.json())
      .then(data => setData(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="heartrate-container">
      <h2>Heart Rate Monitor Entries</h2>
      <div className="table-wrapper">
        <table className="heartrate-table">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Heart Rate</th>
              <th>Recorded At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.id}</td>
                <td>{entry.person.first_name}</td>
                <td>{entry.person.last_name}</td>
                <td>{entry.heart_rate}</td>
                <td>{new Date(entry.recorded_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Heartrate;