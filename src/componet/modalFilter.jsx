import React, { useState } from "react";
import NationalIdSearch from "./nationalFilter";
import CompanyFilter from "./comanyFilter";
import CityFilter from "./cityFilter";
import Stocks from "./Stocks";
import Date from "./birthDate";
import PhoneSearch from "./phoneFilter";
import NameSearch from "./name";
import PropTypes from "prop-types";
import axios from "axios";
import { OnRun } from "../config/config";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./confirmation";

const ModalFilter = ({ onSubmit, access, getDf }) => {
  const [title, setTitle] = useState("");
  const [nobours, setNobours] = useState({
    enabled: true,
    name: null,
    birthday: {
      from: null,
      to: null,
    },
    
    city: [],
    symbol: [],
    national_id: [],
    amount: {
      from: null,
      to: null,
    },
    rate: {
      min: null,
      max: null,
    },
    mobile: {
      num1: [],
      num2: [],
    },
  });



  
  const PostData = () => {
    if (title.trim() === "") {
      toast.error("عنوان را پر کنید");
      return;
    }

    axios({
      method: "POST",
      url: `${OnRun}/marketing/fillter`,
      headers: { "content-type": "application/json" },
      data: {
        access: access,
        title: title,
        config: {
          nobours: nobours,
          send_time: "1722681000000",
          period: "daily",
        },
      },
    })
      .then((response) => {
        getDf();
        toast.success("Data submitted successfully!");
        onSubmit();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error("An error occurred while submitting data!");
      });
  };

  return (
    <div className="relative w-full max-w-4xl max-h-screen rounded-xl p-6 overflow-hidden">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
        سهامداران غیر بورسی
      </h2>

      <div className="flex justify-center mb-8">
        <TextField
          id="outlined-basic"
          className="p-1 w-96 mx-auto text-gray-700 bg-white rounded-lg"
          label="عنوان را وارد کنید"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="overflow-y-auto max-h-[calc(50vh-100px)]">
        <div className="bg-white rounded-lg p-6 shadow-inner">
          <NationalIdSearch nobours={nobours} setNobours={setNobours} />
          <NameSearch nobours={nobours} setNobours={setNobours} />
          <PhoneSearch nobours={nobours} setNobours={setNobours} />
          <CityFilter
            access={access}
            nobours={nobours}
            setNobours={setNobours}
          />
          <CompanyFilter
            access={access}
            nobours={nobours}
            setNobours={setNobours}
          />
          <Stocks nobours={nobours} setNobours={setNobours} />
          <Date nobours={nobours} setNobours={setNobours} />
        </div>
      </div>

      {<ConfirmationModal /> && (
        <button
          onClick={PostData}
          className="mt-6 bg-green-500 text-white px-8 py-1 rounded-md shadow-md hover:bg-green-700 justify-center"
        >
          ایجاد
        </button>
      )}
    </div>
  );
};

ModalFilter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  access: PropTypes.object.isRequired,
  getDf: PropTypes.func.isRequired,
};

export default ModalFilter;
