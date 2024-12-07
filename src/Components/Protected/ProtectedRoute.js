import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  console.log(localStorage.getItem('authToken'))
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check for token

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
