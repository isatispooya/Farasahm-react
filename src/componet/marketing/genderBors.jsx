import React, { useState, useEffect } from "react";
import {
  Button,
  Chip,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { OnRun } from "../../config/config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const GenderBors = ({ config, setConfig }) => {
  const [dropdown, setdropdown] = useState(false);

  const openDropDown = () => {
    setdropdown(!dropdown);
  };
  return (
    <>
      <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
        <button
          onClick={openDropDown}
          className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          دارایی
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
          <RadioGroup name="use-radio-group" defaultValue="first">
            <FormControlLabel value="first" label="First" control={<Radio />} />
            <FormControlLabel
              value="second"
              label="Second"
              control={<Radio />}
            />
          </RadioGroup>
        )}
      </div>
    </>
  );
};

export default GenderBors;
