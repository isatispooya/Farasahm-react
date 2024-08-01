import React, { useEffect, useState } from "react";
import { Autocomplete, Button, Chip, Stack, TextField } from "@mui/material";
import axios from "axios";
import { OnRun } from "../config/config";

const CompanyCity = ({ access }) => {
  const [cityList, setCityList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [cityInput, setCityInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");

  const [citySelected, setCitySelected] = useState([]);
  const [companySelected, setCompanySelected] = useState([]);

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

  const getCompanyList = () => {
    axios({
      method: "POST",
      url: `${OnRun}/marketing/symbolregisternobours`,
      data: { access },
    }).then((response) => {
      setCompanyList(response.data);
    });
  };

  const handleCityChange = (event, newValue) => {
    setCityInput(newValue);
  };

  const handleCompanyChange = (event, newValue) => {
    setCompanyInput(newValue);
  };

  const handleAddCity = () => {
    if (cityInput && !citySelected.includes(cityInput)) {
      setCitySelected((prev) => [...prev, cityInput]);
      setCityInput("");
    }
  };

  const handleAddCompany = () => {
    if (companyInput && !companySelected.includes(companyInput)) {
      setCompanySelected((prev) => [...prev, companyInput]);
      setCompanyInput("");
    }
  };

  const handleDelete = (item, type) => {
    if (type === "city") {
      setCitySelected((prev) => prev.filter((city) => city !== item));
    } else if (type === "company") {
      setCompanySelected((prev) => prev.filter((company) => company !== item));
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(getCityList, []);
  useEffect(getCompanyList, []);

  const availableCities = cityList.filter(
    (city) => !citySelected.includes(city)
  );
  const availableCompanies = companyList
    .map((i) => i.fullname)
    .filter((company) => !companySelected.includes(company));

  return (
    <div
      dir="rtl"
      className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg"
    >
      <button
        onClick={toggleDropdown}
        className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
      >
        شهر و شرکت
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
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "#22c55e",
                borderRadius: "10px",
                fontSize: "15px",
                height: "45px",
              }}
            >
              افزودن
            </Button>
          </div>

          <Stack
            direction="row"
            spacing={2}
            mt={2}
            justifyContent="flex-end"
            sx={{ flexWrap: "wrap", gap: 1 }}
          >
            {citySelected.map((city, index) => (
              <Chip
                key={`city-${index}`}
                label={city || "Unknown City"}
                onDelete={() => handleDelete(city, "city")}
                deleteIcon={
                  <button
                    style={{ color: "white" }}
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
                className="flex items-center px-4 py-2 mb-20 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
              />
            ))}
          </Stack>

          <div className="mb-2 mt-2 flex items-center space-x-4 space-x-reverse">
            <Autocomplete
              value={companyInput}
              options={availableCompanies}
              onChange={handleCompanyChange}
              onInputChange={(event, newInputValue) => {
                setCompanyInput(newInputValue);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAddCompany();
                }
              }}
              renderInput={(params) => (
                <TextField
                  style={{ backgroundColor: "white" }}
                  {...params}
                  label="انتخاب شرکت"
                  fullWidth
                />
              )}
              style={{ flex: 1 }}
            />
            <Button
              onClick={handleAddCompany}
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "#22c55e",
                borderRadius: "10px",
                fontSize: "15px",
                height: "45px",
              }}
            >
              افزودن
            </Button>
          </div>

          <Stack
            direction="row"
            spacing={2}
            mt={2}
            justifyContent="flex-end"
            sx={{ flexWrap: "wrap", gap: 1 }}
          >
            {companySelected.map((company, index) => (
              <Chip
                key={`company-${index}`}
                label={company || "Unknown Company"}
                onDelete={() => handleDelete(company, "company")}
                deleteIcon={
                  <button
                    style={{ color: "white" }}
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

export default CompanyCity;


