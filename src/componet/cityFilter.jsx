/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Autocomplete, Button, Chip, Stack, TextField } from "@mui/material";
import axios from "axios";
import { OnRun } from "../config/config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const CityFilter = ({ access, config, setConfig }) => {
  const [cityList, setCityList] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [citySelected, setCitySelected] = useState([]);

  useEffect(() => {
    var nobours = {...config.nobours, city:citySelected}
    setConfig({ ...config, nobours: config });
  }, [citySelected]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getCityList = () => {
    axios({
      method: "POST",
      url: `${OnRun}/marketing/cityregisternobours`,
      data: { access },
    }).then((response) => {
      setCityList(response.data);
    });
  };

  const handleCityChange = (event, newValue) => {
    setCityInput(newValue);
  };

  const handleAddCity = () => {
    if (
      cityInput &&
      availableCities.includes(cityInput) &&
      !citySelected.includes(cityInput)
    ) {
      setCitySelected((prev) => [...prev, cityInput]);
      setCityInput("");
    } else {
      toast.error("لطفا یک شهر معتبر انتخاب کنید");
    }
  };

  const handleDelete = (item, type) => {
    if (type === "city") {
      setCitySelected((prev) => prev.filter((city) => city !== item));
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(getCityList, []);

  const availableCities = cityList.filter(
    (city) => !citySelected.includes(city)
  );

  return (
    <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
      <ToastContainer />
      <button
        onClick={toggleDropdown}
        className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
      >
        شهر
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
        <div className="mt-2 bg-gray-200 p-4 rounded-lg shadow-md">
          <div className="mb-2 mt-2 flex items-center space-x-4 space-x-reverse">
            <Autocomplete
              value={cityInput}
              options={availableCities}
              onChange={handleCityChange}
              onInputChange={(event, newInputValue) => {
                setCityInput(newInputValue);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAddCity();
                }
              }}
              renderInput={(params) => (
                <TextField
                  style={{ backgroundColor: "white" }}
                  {...params}
                  label="انتخاب شهر"
                  fullWidth
                />
              )}
              style={{ flex: 1 }}
            />
            <Button
              onClick={handleAddCity}
              sx={{ borderRadius: 2 }}
              variant="contained"
            >
              افزودن
            </Button>
          </div>

          <Stack
            direction="row"
            spacing={2}
            mt={2}
            justifyContent="flex-end"
            sx={{ flexWrap: "wrap", gap: 1, direction: "rtl" }}
          >
            {citySelected.map((city, index) => (
              <Chip
                key={`city-${index}`}
                label={city || "Unknown City"}
                onDelete={() => handleDelete(city, "city")}
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
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "16px",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                }}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
              />
            ))}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default CityFilter;
