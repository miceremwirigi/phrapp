import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;