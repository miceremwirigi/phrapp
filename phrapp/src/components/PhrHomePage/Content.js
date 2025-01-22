import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

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
    <div className="Content-field">
      {loading && <Loader />}
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
        <h1>Welcome to PHR</h1>
        <p>Find all the information related to your health records here.</p>
        <p>Explore our features to manage your health effectively.</p>
      </div>
    </div>
  );
}

export default Content;