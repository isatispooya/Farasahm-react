import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const FieldBime = ({ config, setConfig }) => {
  const [search, setSearch] = useState("");
  const [dropDown, setDropDown] = useState(false);

  const AddField = () => {
    if (search && !config.insurance.insurance_field.includes(search)) {
      let insurance_field_list = [...config.insurance.insurance_field, search];
      setConfig({
        ...config,
        insurance: {
          ...config.insurance,
          insurance_field: insurance_field_list,
        },
      });
      setSearch(""); 
    }
  };

  const Remove = (id) => {
    const filteredFields = config.insurance.insurance_field.filter(
      (field) => field !== id
    );
    setConfig({
      ...config,
      insurance: { ...config.insurance, insurance_field: filteredFields },
    });
  };

  const searchFieldFilter = (e) => {
    const value = e.target.value;
    if (/^[\u0600-\u06FFa-zA-Z\s]*$/.test(value)) {
      setSearch(value);
    }
  };

  const useEnterKey = (e) => {
    if (e.key === "Enter") {
      AddField();
    }
  };

  const toggleDropdown = () => {
    setDropDown((prev) => !prev);
  };

  return (
    <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
      <div>
        <button
          onClick={toggleDropdown}
          className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          رشته بیمه
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`inline-block ml-2 h-5 w-5 transform transition-transform duration-300 ${
              dropDown ? "rotate-180 duration-500" : "rotate-0 duration-500"
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
        {dropDown && (
          <div className="mt-2 bg-gray-200 p-4 rounded-lg shadow-md">
            <div className="mb-2 mt-8 flex items-center space-x-4">
              <TextField
                style={{ backgroundColor: "white", marginLeft: "20px" }}
                id="outlined-basic-name"
                value={search}
                onChange={searchFieldFilter}
                onKeyDown={useEnterKey}
                label="جستجو"
                variant="outlined"
                inputProps={{
                  inputMode: "text",
                  pattern: "[\u0600-\u06FFa-zA-Z\\s]*",
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />

              <Button
                onClick={AddField}
                sx={{ borderRadius: 2 }}
                variant="contained"
              >
                افزودن
              </Button>
            </div>

            {config.insurance.insurance_field &&
              config.insurance.insurance_field.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {config.insurance.insurance_field.map((insurance_field) => (
                    <div
                      key={insurance_field}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      <span className="mr-2 text-lg font-medium">
                        {insurance_field}
                      </span>
                      <button
                        onClick={() => Remove(insurance_field)}
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
                    </div>
                  ))}
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldBime;

