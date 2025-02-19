import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import logo from './logo.svg'; // Ensure you have a logo image

function Content() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (option) => {
    setLoading(true);
    if (option === 'health-monitor') {
      navigate('/view-heart-rate-entries');
    } else if (option === 'my-details') {
      navigate('/my-details');
    } else if (option === 'hospital-visits') {
      navigate('/view-hospital-visits');
    } else if (option === 'self-medication') {
      navigate('/view-self-medications');
    } else if (option === 'add-hospital-visit') {
      navigate('/add-hospital-visit');
    } else if (option === 'my-hospitals') {
      navigate('/view-hospitals');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="parent-container">
      {loading && <Loader />}
      <div className="menu-container">
        <button className="menu-button">Menu</button>
        <div className="menu-content">
          <button onClick={() => handleMenuClick('hospital-visits')}>Hospital visits</button>
          <button onClick={() => handleMenuClick('self-medication')}>Self Medication</button>
          <button onClick={() => handleMenuClick('add-hospital-visit')}>Add Hospital Visit</button>
          <button onClick={() => handleMenuClick('my-hospitals')}>My hospitals</button>
          <button onClick={() => handleMenuClick('health-monitor')}>Health monitor</button>
          <button onClick={() => handleMenuClick('my-details')}>My Details</button>
        </div>
      </div>
      <div className="content-container">
        <h1>Welcome to PHR</h1>
        <p>Store and find information related to your health records here.</p>
        <p>Explore our features to manage your health effectively.</p>
        <img src={logo} className="App-logo-rotate" alt="logo" />
      </div>
    </div>
  );
}

export default Content;