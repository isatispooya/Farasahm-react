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
import { TextField } from "@mui/material";

const ModalFilter = ({ toggleModal, access }) => {
  const [title,setTitle]=useState('')
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
    axios({
      method: "POST",
      url: `${OnRun}/marketing/fillter`,
      headers: { 'content-type': 'application/json' },
      data: {
        access: access,
        title: title,
        config: {
          nobours: nobours
        }
      }
    })
      .then((response) => {
        console.log(response.data, 23353464);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="relative bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 w-full max-w-4xl max-h-screen rounded-xl p-10 shadow-2xl overflow-y-auto">
        <button
          onClick={toggleModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 bg-red-500 rounded-full p-2 hover:scale-110 duration-500 flex items-center"
        >
          <GrClose className="text-xl text-white hover:text-black" />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">سهامداران غیر بورسی</h2>

        <div className="flex justify-center mb-8">
          <TextField
            id="outlined-basic"
            className="p-1 w-96 mx-auto text-gray-700 bg-white rounded-lg"
            label="عنوان را وارد کنید"
            variant="outlined"
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg p-6 shadow-inner">
            <NationalIdSearch nobours={nobours} setNobours={setNobours} />
            <PhoneSearch nobours={nobours} setNobours={setNobours} />
            <CompanyCity access={access} nobours={nobours} setNobours={setNobours} />
            <SliderComponent nobours={nobours} setNobours={setNobours} />
            <Date nobours={nobours} setNobours={setNobours} />
          </div>
        </div>

        <button
          onClick={() => {
            PostData(); 
            toggleModal(); 
          }}
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 justify-center"
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
