import React from 'react';
import MainPageHeading from './MainPageHeading';

interface ErrorViewProps {
  onReload: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({ onReload }) => {
  return (
    <div className="container-fluid movie-app">
    <div className="btn d-flex align-items-center mt-5 mb-5" onClick={onReload}>
        <MainPageHeading heading="Movies" />
      </div>
      <div className="error-view">
        <h2>Error occurred while fetching movies</h2>
        <p>Please try again later.</p>
        <button className="reload-button" onClick={onReload}>
          Reload
        </button>
      </div>
    </div>
  );
};

export default ErrorView;
