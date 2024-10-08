import React, { useEffect, useState } from "react";
import { Button, Chip, Stack } from "@mui/material";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { OnRun } from "../../../config/config";

const CityFilter = ({ access, config, setConfig }) => {
  const [cityList, setCityList] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getCityList = () => {
    const options = {
      method: "POST",
      url: `${OnRun}/marketing/cityregisternobours`,
      headers: { "content-type": "application/json" },
      data: { access }
    };

    axios
      .request(options)
      .then((response) => {
        setCityList(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    getCityList();
  },[]);

  const handleDelete = (city) => {
    const city_list = (config.nobours.city || []).filter((i) => i !== city);
    const nobours = { ...config.nobours, city: city_list };
    setConfig({ ...config, nobours: nobours });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const availableCities = cityList.filter(
    (city) => !(config.city ?? []).includes(city)
  );


  const handleAddCity = () => {
    if (cityInput) {
      const available = cityList.includes(cityInput);
      if (available) {
        const city_list = [...(config.nobours.city || [])];
        city_list.push(cityInput);
        const nobours = { ...config.nobours, city: city_list };
        setConfig({ ...config, nobours: nobours });
        setCityInput("");
      } else {
        toast.error("لطفا یک شهر معتبر انتخاب کنید");
      }
    }
  };

  return (
    <>
      <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
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
          <div
            dir="rtl"
            className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <ToastContainer />
            <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
          

              <input
              className="p-3 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              list="city"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="جستجوی شهر"
            />
            <datalist id="city">
              {availableCities.map((i,index) => {
                return (
                  <option key={index}>
                    {i}
                  </option>
                );
              })}
            </datalist>

              <Button
                onClick={handleAddCity}
                sx={{ borderRadius: 2 }}
                variant="contained"
              >
                افزودن
              </Button>

              <Stack
                direction="row"
                spacing={1}
                mt={2}
                justifyContent="flex-start"
                sx={{ flexWrap: "wrap" }}
              >
                {(config.nobours.city || []).map((city, index) => (
                  <Chip
                    key={`city-${index}`}
                    label={city}
                    onDelete={() => handleDelete(city)}
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
                    }}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
                  />
                ))}
              </Stack>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CityFilter;
