import React from 'react';

const ModalFilter = ({ toggleModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-4">Modal Content</h2>
        <div className="space-y-4">

        </div>
        <button
          onClick={toggleModal}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalFilter;

