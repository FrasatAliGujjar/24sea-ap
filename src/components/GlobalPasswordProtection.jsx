"use client"

import { useState, useEffect } from 'react';
import PasswordModal from './PasswordModal';

const GlobalPasswordProtection = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Always show password modal on page load/refresh
    setShowModal(true);
    setIsLoading(false);
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setIsAuthenticated(true);
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show password modal if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
        <PasswordModal 
          isOpen={showModal} 
          onClose={handleModalClose} 
        />
      </div>
    );
  }

  // Show protected content if authenticated
  return (
    <>
      {children}
    </>
  );
};

export default GlobalPasswordProtection;
