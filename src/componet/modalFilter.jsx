import React, { useState } from 'react';
import NationalIdSearch from './nationalFilter';
import CompanyCity from '../page/companyCity';
import SliderComponent from "../componet/slider";
import Date from "../componet/date";
import PhoneSearch from './phoneFilter';
import PropTypes from 'prop-types';

const ModalFilter = ({ toggleModal, access }) => {
  const [nobours, setNobours] = useState({
    enabled: true,
    national_id:[],
    mobile:{num1:null,num2:null}
  });


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white w-full max-w-6xl max-h-screen rounded-lg p-8 shadow-lg overflow-y-auto">
        <h2 className="text-2xl mb-4 text-center">سهامداران غیر بورسی</h2>

        <div className="space-y-6">
          <div className="bg-gray-100 rounded-lg">
            <NationalIdSearch nobours={nobours} setNobours={setNobours}/>
          </div>
          <div className="bg-gray-100 rounded-lg">
            <PhoneSearch nobours={nobours} setNobours={setNobours} />
          </div>
          <div className="bg-gray-100 rounded-lg shadow-md">
            <CompanyCity access={access} />
          </div>
          <div className="bg-gray-100 rounded-lg shadow-md">
            <SliderComponent />
          </div>
          <div className="bg-gray-100 rounded-lg shadow-md">
            <Date />
          </div>
        </div>

        <button
          onClick={toggleModal}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 w-full"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

ModalFilter.propTypes = {
  toggleModal: PropTypes.func.isRequired, // Ensure toggleModal is a function
  access: PropTypes.string.isRequired, // Adjust type if access is not a string
};

export default ModalFilter;
