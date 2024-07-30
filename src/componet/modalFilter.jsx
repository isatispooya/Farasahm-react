import React from 'react';
import NationalIdSearch from './nationalFilter';
import CompanyCity from '../page/companyCity';

const ModalFilter = ({ toggleModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 ">
      <div className="bg-white w-full h-full rounded-lg p-8 shadow-lg  ">
        <h2 className="text-2xl mb-4">فیلتر </h2>
         <NationalIdSearch/>
         <CompanyCity />
        <button
          onClick={toggleModal}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default ModalFilter;

