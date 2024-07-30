import React, { useState, useEffect } from 'react';
import ModalFilter from '../componet/modalFilter';

const Marketing = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); // Set modal to open on page load

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isModalOpen && <ModalFilter toggleModal={toggleModal} />}
    </div>
        <div className='bg-red-700'>
            hello
            <Date/>
        </div>
  
    </> );
}

export default Marketing;
