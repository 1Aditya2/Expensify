import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <button
        onClick={handleGoHome}
        className="bg-slate-300 hover:bg-slate-500 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
