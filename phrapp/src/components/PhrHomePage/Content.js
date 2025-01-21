import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg'; // Ensure you have a logo image

function Content() {
  const navigate = useNavigate();

  const handleMenuClick = (option) => {
    if (option === 'health-monitor') {
      navigate('/health-monitor');
    } else if (option === 'my-details') {
      navigate('/my-details');
    } else if (option === 'hospital-visits') {
      navigate('/view-hospital-visits');
    } else if (option === 'self-medication') {
      navigate('/view-self-medications');
    } else if (option === 'add-hospital-visit') {
      navigate('/add-hospital-visit');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="Content-field">
      <div className="menu">
        <button className="menupbtn">Menu</button>
        <div className="menu-content">
          <button onClick={() => handleMenuClick('hospital-visits')}>Hospital visits</button>
          <button onClick={() => handleMenuClick('self-medication')}>Self Medication</button>
          <button onClick={() => handleMenuClick('add-hospital-visit')}>Add Hospital Visit</button>
          <button onClick={() => handleMenuClick('my-hospitals')}>My hospitals</button>
          <button onClick={() => handleMenuClick('health-monitor')}>Health monitor</button>
          <button onClick={() => handleMenuClick('my-details')}>My Details</button>
        </div>
      </div>
      <div>
        <h1>Welcome to the PHR</h1>
        <p>Here you can save and find all the information related to your health records.</p>
        <p>Explore our features to manage your health effectively.</p>
        <img src={logo} className="App-logo-rotate" alt="logo" />
      </div>
    </div>
  );
}

export default Content;