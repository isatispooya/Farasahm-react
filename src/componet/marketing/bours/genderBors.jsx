import React, { useState } from "react";
import { FormControlLabel, Radio, RadioGroup, Box } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import { FaFemale } from "react-icons/fa";
import { BiMale } from "react-icons/bi";

const GenderBors = ({ config, setConfig }) => {
  const [dropdown, setDropdown] = useState(false);
  const [selectedGender, setSelectedGender] = useState(config.bours.gender === true ? 'male' : config.bours.gender === false ? 'female' : null);

  const openDropDown = () => {
    setDropdown(!dropdown);
  };

  const handleGenderChange = (event) => {
    const value = event.target.value;

    setSelectedGender(value);

    setConfig((prevConfig) => ({
      ...prevConfig,
      bours: {
        ...prevConfig.bours,
        gender: value === "male" ? "true" : value === "female" ? "false" : null,
      },
    }));
  };

  return (
    <>
      <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
        <button
          onClick={openDropDown}
          className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          جنسیت
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`inline-block ml-2 h-5 w-5 transform transition-transform duration-300 ${
              dropdown ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {dropdown && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <RadioGroup
              row
              name="gender-radio-group"
              value={selectedGender}
              onChange={handleGenderChange}
              className="flex justify-around"
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label={
                  <Box display="flex" alignItems="center">
                    مرد
                    <BiMale className="ml-1" />
                  </Box>
                }
                className="text-gray-700"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={
                  <Box display="flex" alignItems="center">
                    زن
                    <FaFemale className="ml-1" />
                  </Box>
                }
                className="text-gray-700"
              />
            </RadioGroup>
          </div>
        )}
      </div>
    </>
  );
};

export default GenderBors;
