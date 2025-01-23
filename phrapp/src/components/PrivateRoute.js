import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, children }) => {
  const storedIsLooggenin = localStorage.getItem('isLoggedIn');
  if (storedIsLooggenin === 'true') {
    return children;
  }
  return isLoggedIn ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;