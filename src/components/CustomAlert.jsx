import React from 'react';
import { createPortal } from 'react-dom'; 
function CustomAlert({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full transform transition-all duration-300 ease-out scale-95 opacity-0 animate-scaleIn">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Notification</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
            aria-label="Close alert"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body 
  );
}

export default CustomAlert;