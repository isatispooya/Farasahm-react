import React, { useState } from "react";
import { Button, TextField, Stack, Chip } from "@mui/material";

import { toast } from "react-toastify";
import { city_list } from "../city_list";
const NationalFilterBors = ({config , setConfig}) => {
  const [search, setSearch] = useState("");
  const [cityselected, setCityselected] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const addToConfig = () => {
    let nc_list = config.bours.national_id || [];
    let bours;

    if (search) {
      nc_list.push(search);
      bours = { ...config.bours, national_id: nc_list };
      setConfig({ ...config, bours: bours });
      setSearch("");
    } else if (cityselected) {
      const selectedCityObject = city_list.find(
        (city) => city.city === cityselected
      );

      if (selectedCityObject && selectedCityObject.num.length > 0) {
        nc_list.push(selectedCityObject.num[0]);
        bours = { ...config.bours, national_id: nc_list };
        setConfig({ ...config, bours: bours });
        setCityselected("");
        setInputValue("");
      } else {
        toast.error("شهر انتخاب شده معتبر نیست");
      }
    }
  };

  const RemoveSelected = (id) => {
    let nc_list = config.bours.national_id || [];
    nc_list = nc_list.filter((i) => i !== id);
    let bours = { ...config.bours, national_id: nc_list };
    setConfig({ ...config, bours: bours });
  };

  const handleSearchNumber = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setSearch(value);
  };

  const openDropdown = () => {
    setDropDown(!dropDown);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addToConfig();
    }
  };
  console.log(config)

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
                  onChange={handleSearchNumber}
                  label="جستجو کد ملی"
                  variant="outlined"
                  onKeyDown={handleKeyDown}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>

              <input
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                list="city"
                value={cityselected}
                onChange={(e) => setCityselected(e.target.value)}
              />
              <datalist
                id="city"
                className="bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-y-auto"
              >
                {city_list.map((i) => {
                  return (
                    <option
                      key={i.city}
                      value={i.city}
                      className="p-2 hover:bg-gray-200 transition duration-200"
                    >
                      {i.city}
                    </option>
                  );
                })}
              </datalist>

              <Button
                onClick={addToConfig}
                className="ml-4 rounded-lg"
                variant="contained"
              >
                افزودن
              </Button>
            </div>

            {config?.bours?.national_id?.length > 0 && (
              <Stack
                direction="row"
                spacing={1}
                mt={2}
                justifyContent="flex-start"
                sx={{ flexWrap: "wrap" }}
              >
                {(config.bours.national_id || []).map((item, index) => (
                  <Chip
                    key={`mored-${index}`}
                    label={item}
                    onDelete={() => RemoveSelected(item)}
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
    </>
  );
};

export default NationalFilterBors;
