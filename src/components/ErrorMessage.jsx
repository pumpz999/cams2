import React from 'react';
import '../styles/global.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <h3>Error</h3>
      <p>{message}</p>
      <p>Please try again later or contact support.</p>
    </div>
  );
};

export default ErrorMessage;
