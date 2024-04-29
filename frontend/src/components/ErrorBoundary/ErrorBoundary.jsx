// components/ErrorBoundary.js
import React,{useState} from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error) => {
    setHasError(true);
    console.error('Error caught in error boundary:', error);
    // Optionally, send error report to a service
  };

  return (
    <div>
      {hasError ? (
        <h2>Something went wrong.</h2>
      ) : (
        children
      )}
    </div>
  );
};

export default ErrorBoundary;
