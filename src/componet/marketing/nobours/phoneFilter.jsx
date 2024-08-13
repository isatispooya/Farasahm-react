import { Button, Chip, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const PhoneSearch = ({ config, setConfig }) => {
  const [inputNum1, setInputNum1] = useState("");
  const [inputNum2, setInputNum2] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const mobile = config?.nobours?.mobile || { num1: [], num2: [] };

  const handleSearch1 = (e) => {
    const value = e.target.value;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setInputNum1(value);
    }
  };

  const handleSearch2 = (e) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setInputNum2(value);
    }
  };

  const handleAdd1 = () => {
    if (inputNum1.length > 0 && !mobile.num1.includes(inputNum1)) {
      const num1Config = [...mobile.num1, inputNum1];
      setConfig((prevConfig) => ({
        ...prevConfig,
        nobours: {
          ...prevConfig.nobours,
          mobile: {
            ...mobile,
            num1: num1Config,
          },
        },
      }));
    }
    setInputNum1("");
  };

  const handleAdd2 = () => {
    if (inputNum2.length > 0 && !mobile.num2.includes(inputNum2)) {
      const num2Config = [...mobile.num2, inputNum2];
      setConfig((prevConfig) => ({
        ...prevConfig,
        nobours: {
          ...prevConfig.nobours,
          mobile: {
            ...mobile,
            num2: num2Config,
          },
        },
      }));
    }
    handleAdd1();
    setInputNum2("");
  };

  const handleRemove1 = (id) => {
    const num1Config = mobile.num1.filter((i) => i !== id);
    setConfig((prevConfig) => ({
      ...prevConfig,
      nobours: {
        ...prevConfig.nobours,
        mobile: {
          ...mobile,
          num1: num1Config,
        },
      },
    }));
  };

  const handleRemove2 = (id) => {
    const num2Config = mobile.num2.filter((i) => i !== id);
    setConfig((prevConfig) => ({
      ...prevConfig,
      nobours: {
        ...prevConfig.nobours,
        mobile: {
          ...mobile,
          num2: num2Config,
        },
      },
    }));
  };

  const handleKeyDown1 = (e) => {
    if (e.key === "Enter") {
      handleAdd1();
    }
  };

  const handleKeyDown2 = (e) => {
    if (e.key === "Enter") {
      handleAdd2();
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
      <button
        onClick={toggleDropdown}
        className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
      >
        شماره تماس
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`inline-block ml-2 h-5 w-5 transform transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
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
      {isDropdownOpen && (
        <div className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg">
          <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
            <TextField
              style={{ backgroundColor: "white" }}
              value={inputNum1}
              onChange={handleSearch1}
              onKeyDown={handleKeyDown1}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              id="outlined-basic"
              label="پیش شماره همراه"
              variant="outlined"
            />
            <TextField
              style={{ backgroundColor: "white" }}
              id="outlined-basic"
              label="سه رقم میانه شماره همراه"
              variant="outlined"
              value={inputNum2}
              onChange={handleSearch2}
              onKeyDown={handleKeyDown2}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />

            <Button
              onClick={handleAdd2}
              sx={{ borderRadius: 2 }}
              variant="contained"
            >
              افزودن
            </Button>
          </div>

          {mobile.num1.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              mt={2}
              justifyContent="flex-start"
              sx={{ flexWrap: "wrap" }}
            >
              {(mobile.num1 || []).map((item, index) => (
                <Chip
                  key={`num1-${index}`}
                  label={item}
                  onDelete={() => handleRemove1(item)}
                  deleteIcon={
                    <button
                      style={{ color: "white", marginRight: "5px" }}
                      className="ml-2 mr-2 text-white bg-red-500 hover:bg-red-700 rounded-full p-1 transition duration-300 focus:outline-none shadow-md hover:shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  }
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "16px",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
                />
              ))}
            </Stack>
          )}

          {mobile.num2.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              mt={2}
              justifyContent="flex-start"
              sx={{ flexWrap: "wrap" }}
            >
              {(mobile.num2 || []).map((item, index) => (
                <Chip
                  key={`num2-${index}`}
                  label={item}
                  onDelete={() => handleRemove2(item)}
                  deleteIcon={
                    <button
                      style={{ color: "white", marginRight: "5px" }}
                      className="ml-2 mr-2 text-white bg-red-500 hover:bg-red-700 rounded-full p-1 transition duration-300 focus:outline-none shadow-md hover:shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  }
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "16px",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
                />
              ))}
            </Stack>
          )}
        </div>
      )}
    </div>
  );
};

export default PhoneSearch;
