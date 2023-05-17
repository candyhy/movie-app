import React from 'react';
import '../css/LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="spinner" />
    </div>
  );
};

export default LoadingSpinner;
