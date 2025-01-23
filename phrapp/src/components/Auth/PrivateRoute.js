import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({  isLoggedIn, children }) => {  
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
  if (storedIsLoggedIn === true) {
    return children;
  }
  else{
    return isLoggedIn ? children : <Navigate to="/signin" />;
  }  
};

export default PrivateRoute;