import React, { useState } from "react";
import NationalIdSearch from "./nationalFilter";
import CompanyCity from "../page/companyCity";
import SliderComponent from "../componet/slider";
import Date from "../componet/date";
import PhoneSearch from "./phoneFilter";
import PropTypes from "prop-types";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { OnRun } from "../config/config";

const ModalFilter = ({ toggleModal, access }) => {
  const [nobours, setNobours] = useState({
    enabled: true,
    birthday: {
      from: null,
      to: null
    },
    city: [],
    symbol: [],
    national_id: [],
    amount: {
      from: null,
      to: null
    },
    rate: {
      min: null,
      max: null
    },
    mobile: {
      num1: [],
      num2: []
    }
  });

  const PostData = () => {
    console.log('jkjj',nobours)
    axios({
      method: "POST",
      url: `${OnRun}/marketing/fillter`,
      headers: {'content-type': 'application/json'},

      data: {
        access : access,
        title: "dghdhjdhj",
        config: {
          nobours: nobours
        }
      }
    })
    .then((response) => {
      // setNobours(response.data.config.nobours);
      console.log(response.data, 23353464)
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative bg-white w-full max-w-6xl max-h-screen rounded-lg p-8 shadow-lg overflow-y-auto">
        <button
          onClick={toggleModal}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 bg-red-600 rounded-full p-2 hover:scale-110 duration-500 flex items-center"
        >
          <GrClose className="text-xl text-white hover:text-black " />
        </button>

        <h2 className="text-2xl mb-4 text-center">سهامداران غیر بورسی</h2>

        <div className="space-y-6">
          <div className="bg-white rounded-lg">
            <NationalIdSearch nobours={nobours} setNobours={setNobours} />

            <PhoneSearch nobours={nobours} setNobours={setNobours} />

            <CompanyCity access={access} nobours={nobours} setNobours={setNobours} />

            <SliderComponent nobours={nobours} setNobours={setNobours} />

            <Date nobours={nobours} setNobours={setNobours} />
          </div>
        </div>

        <button
          onClick={() => {
            PostData(); // Trigger the POST request on click
            toggleModal(); // Close the modal
          }}
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 w-full"
        >
          ارسال
        </button>
      </div>
    </div>
  );
};

ModalFilter.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  access: PropTypes.object.isRequired,
};

export default ModalFilter;
