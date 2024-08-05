import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import citiesData from "./data.json";

const NationalIdSearch = ({  setConfig }) => {
  const [searchTermPrimary, setSearchTermPrimary] = useState("");
  const [primaryIds, setPrimaryIds] = useState([]);
  const [searchTermSecondary, setSearchTermSecondary] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  // جستجو و افزودن کد ملی به صورت مستقیم
  const handleSearchPrimary = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setSearchTermPrimary(value);
  };

  const handleAddPrimary = () => {
    if (searchTermPrimary && !primaryIds.includes(searchTermPrimary)) {
      setPrimaryIds([...primaryIds, searchTermPrimary]);
      setSearchTermPrimary("");
    }
  };

  const handleRemovePrimary = (id) => {
    setPrimaryIds(primaryIds.filter((existingId) => existingId !== id));
  };

  // جستجو کد ملی براساس نام شهر
  const handleSearchSecondary = (e) => {
    const value = e.target.value;
    setSearchTermSecondary(value);

    const results = citiesData.filter((city) =>
      city.city.includes(value)
    );
    setFilteredCities(results);
  };

  const handleAddSecondary = () => {
    if (filteredCities.length > 0) {
      const selectedCity = filteredCities[0];
      if (!primaryIds.includes(selectedCity.num)) {
        setPrimaryIds([...primaryIds, selectedCity.num]);
      }
      setSearchTermSecondary("");
      setFilteredCities([]);
    }
  };

  // افزودن کد ملی‌ها با فشردن کلید Enter
  const handleKeyDownPrimary = (e) => {
    if (e.key === "Enter") handleAddPrimary();
  };

  const handleKeyDownSecondary = (e) => {
    if (e.key === "Enter") handleAddSecondary();
  };

  // به‌روزرسانی config هر بار که primaryIds تغییر می‌کند
  useEffect(() => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      nobours: { ...prevConfig.nobours, national_id: primaryIds },
    }));
  }, [primaryIds, setConfig]);

  return (
    <div dir="rtl" className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg">
      <div className="flex items-center space-x-4">
        <TextField
          style={{ backgroundColor: "white", flex: 1 , marginLeft: "10px"  }}
          value={searchTermPrimary}
          onChange={handleSearchPrimary}
          onKeyDown={handleKeyDownPrimary}
          label="جستجو کد ملی"
          variant="outlined"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
        />

        <TextField
          style={{ backgroundColor: "white", flex: 1 }}
          value={searchTermSecondary}
          onChange={handleSearchSecondary}
          onKeyDown={handleKeyDownSecondary}
          label="جستجو کد ملی براساس شهر"
          variant="outlined"
          inputProps={{ inputMode: "text", pattern: "[\u0600-\u06FFa-zA-Zs]*" }}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

        <Button
          onClick={() => {
            handleAddPrimary();
            handleAddSecondary();
          }}
          sx={{ borderRadius: 2, marginLeft: "20px" }}
          variant="contained"
        >
          افزودن
        </Button>
      </div>

      {filteredCities.length > 0 && (
        <div className="mt-2 bg-gray-200 p-2 rounded-lg shadow-md">
          {filteredCities.map((city) => (
            <div
              key={city.num}
              className="flex items-center justify-between p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400 transition duration-200"
              onClick={() => {
                setSearchTermSecondary(city.city);
                handleAddSecondary();
              }}
            >
              <span>{city.city}</span>
              <span>{city.num}</span>
            </div>
          ))}
        </div>
      )}

      {primaryIds.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {primaryIds.map((id) => (
            <div
              key={id}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="mr-2 text-lg font-medium">{id}</span>
              <button
                onClick={() => handleRemovePrimary(id)}
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
  );
};

export default NationalIdSearch;




