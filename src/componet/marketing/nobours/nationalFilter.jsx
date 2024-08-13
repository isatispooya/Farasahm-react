import React, { useState } from "react";
import { Button, Chip, Stack, TextField } from "@mui/material";
import { city_list } from "../city_list";

const NationalIdSearch = ({ config, setConfig }) => {
  const [searchTermPrimary, setSearchTermPrimary] = useState("");
  const [citySelected, setCitySelected] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchNumberNationalCode = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setSearchTermPrimary(value);
    }
  };

  const handleRemovePrimary = (id) => {
    const updatedNationalIds = config.nobours.national_id.filter(
      (i) => i !== id
    );
    setConfig({
      ...config,
      nobours: { ...config.nobours, national_id: updatedNationalIds },
    });
  };

  const addNumToConfig = () => {
    let updatedNationalIds = [...config.nobours.national_id];
    if (searchTermPrimary) {
      updatedNationalIds.push(searchTermPrimary);
    } else if (citySelected) {
      const selectedCity = city_list.find((city) => city.city === citySelected);
      if (selectedCity) {
        updatedNationalIds = [...updatedNationalIds, ...selectedCity.num];
      }
    }

    if (searchTermPrimary || citySelected) {
      setConfig({
        ...config,
        nobours: { ...config.nobours, national_id: updatedNationalIds },
      });
      setSearchTermPrimary("");
      setCitySelected("");
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
        کدملی
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
        <div dir="rtl" className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg">
          <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
            <TextField
              style={{ flex: 1 }}
              value={searchTermPrimary}
              onChange={handleSearchNumberNationalCode}
              label="جستجو کد ملی"
              variant="outlined"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <input
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              list="city"
              value={citySelected}
              onChange={(e) => setCitySelected(e.target.value)}
              placeholder="جستجوی کد ملی براساس شهر"
            />
            <datalist id="city">
              {city_list.map((i) => {
                return (
                  <option key={i.city} value={i.city}>
                    {i.city}
                  </option>
                );
              })}
            </datalist>

            <Button
              onClick={addNumToConfig}
              className="ml-4 rounded-lg"
              variant="contained"
            >
              افزودن
            </Button>
          </div>

          {config.nobours.national_id.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              mt={2}
              justifyContent="flex-start"
              sx={{ flexWrap: "wrap" }}
            >
              {(config.nobours.national_id || []).map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => handleRemovePrimary(item)}
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

export default NationalIdSearch;
