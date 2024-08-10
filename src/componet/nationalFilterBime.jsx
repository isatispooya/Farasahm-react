import React, { useState } from "react";
import { Button, TextField, Autocomplete } from "@mui/material";
import { city_list } from "./marketing/city_list";

const NationalFilterBime = ({ config, setConfig }) => {
  const [search, setSearch] = useState("");
  const [cityselected, setCityselected] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const add_num_to_config = () => {
    let nc_list = config.insurance.national_id;
    let insurance;

    if (search) {
      // Add single national ID entered by the user
      nc_list.push(search);
      insurance = { ...config.insurance, national_id: nc_list };
      setConfig({ ...config, insurance: insurance });
      setSearch("");
    } else if (cityselected) {
   
      if (cityselected.num && cityselected.num.length > 0) {
        nc_list.push(cityselected.num[0]); 
        insurance = { ...config.insurance, national_id: nc_list };
        setConfig({ ...config, insurance: insurance });
        setCityselected(null);
        setInputValue("");
      }
    }
  };

  const Remove_selected = (id) => {
    let nc_list = config.insurance.national_id;
    nc_list = nc_list.filter((i) => i !== id);
    let insurance = { ...config.insurance, national_id: nc_list };
    setConfig({ ...config, insurance: insurance });
  };

  const handle_search_number_national_code = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setSearch(value);
  };

  const openDropdown = () => {
    setDropDown(!dropDown);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      add_num_to_config();
    }
  };

  return (
    <>
      <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
        <button
          onClick={openDropdown}
          className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          کدملی
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`inline-block ml-2 h-5 w-5 transform transition-transform duration-300 ${
              dropDown ? "rotate-180" : "rotate-0"
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
          <div
            dir="rtl"
            className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg"
          >
            <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
              <div className="flex items-center space-x-4">
                <TextField
                  style={{ flex: 1 }}
                  value={search}
                  onChange={handle_search_number_national_code}
                  label="جستجو کد ملی"
                  variant="outlined"
                  onKeyDown={handleKeyDown}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>

              <Autocomplete
                options={city_list}
                onKeyDown={handleKeyDown}
                getOptionLabel={(option) => option.city}
                filterOptions={(options, state) =>
                  options.filter((option) =>
                    option.city.includes(state.inputValue)
                  )
                }
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                onChange={(event, newValue) => {
                  setCityselected(newValue);
                  // Keeping the dropdown open after selection
                  setDropDown(true);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="کدملی براساس شهر"
                    variant="outlined"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                )}
              />

              <Button
                onClick={add_num_to_config}
                className="ml-4 rounded-lg"
                variant="contained"
              >
                افزودن
              </Button>
            </div>

            {config?.insurance?.national_id?.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {config.insurance.national_id.map((id, index) => (
                  <div
                    key={index}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <span className="mr-2 text-lg font-medium">{id}</span>
                    <button
                      onClick={() => Remove_selected(id)}
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
    </>
  );
};

export default NationalFilterBime;

