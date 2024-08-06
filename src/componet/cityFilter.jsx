import React, { useEffect, useState } from "react";
import { Button, Chip, Stack, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { OnRun } from "../config/config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const CityFilter = ({ access, config = { config: { city: [] } }, setConfig }) => {
  const [cityList, setCityList] = useState([]);
  const [cityInput, setCityInput] = useState("");
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

  useEffect(() => {
    getCityList();
  }, [access]);

  const handleAddCity = () => {
    const available = cityList.includes(cityInput);
    if (available) {
      const city_list = config.nobours.city;
      city_list.push(cityInput);
      const nobours = { ...config.nobours, city: city_list };
      setConfig({ ...config, nobours });
      setCityInput("");
    } else {
      toast.error("لطفا یک شهر معتبر انتخاب کنید");
    }
  };

  const handleDelete = (city) => {
    const city_list = config.nobours.city.filter(i => i !== city);
    const nobours = { ...config.nobours, city: city_list };
    setConfig({ ...config, nobours });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const availableCities = cityList.filter(
    (city) => !config.config?.city?.includes(city)
  );

  return (
    <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
      <ToastContainer />
      <div>
        <TextField
          select
          value={cityInput}
          onChange={e => setCityInput(e.target.value)}
          label="شهر"
          fullWidth
          variant="outlined"
          style={{ marginBottom: 16 }}
          onClick={toggleDropdown}
        >
          {availableCities.map(city => (
            <MenuItem value={city} key={city}>
              {city}
            </MenuItem>
          ))}
        </TextField>
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
  );
};

export default CityFilter;
