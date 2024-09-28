import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isRegistered }) => {
  return isRegistered ? children : <Navigate to="/" />;
};

export default PrivateRoute;