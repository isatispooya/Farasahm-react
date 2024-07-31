import React, { useEffect, useState } from "react";
import { Autocomplete, Chip, Stack, TextField } from "@mui/material";
import axios from "axios";
import { OnRun } from "../config/config";

const CompanyCity = ({ access }) => {
  const [cityList, setCityList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [citySelected, setCitySelected] = useState([]);
  const [companySelected, setCompanySelected] = useState([]);

  const getCityList = () => {
    axios({
      method: "POST",
      url: `${OnRun}/marketing/cityregisternobours`,
      data: { access },
    }).then((response) => {
      console.log("City List:", response.data); 
      setCityList(response.data);
    });
  };

  const getCompanyList = () => {
    axios({
      method: "POST",
      url: `${OnRun}/marketing/symbolregisternobours`,
      data: { access },
    }).then((response) => {
      console.log("Company List:", response.data); 
      setCompanyList(response.data);
    });
  };

  const handleCityChange = (event, newValue) => {
    if (newValue && !citySelected.includes(newValue)) {
      setCitySelected((prev) => [...prev, newValue]);
      // Clear the input field
      event.target.value = '';
    }
  };

  const handleCompanyChange = (event, newValue) => {
    if (newValue && !companySelected.includes(newValue)) {
      setCompanySelected((prev) => [...prev, newValue]);
      // Clear the input field
      event.target.value = '';
    }
  };

  const handleDelete = (item, type) => {
    if (type === 'city') {
      setCitySelected((prev) => prev.filter((city) => city !== item));
    } else if (type === 'company') {
      setCompanySelected((prev) => prev.filter((company) => company !== item));
    }
  };

  useEffect(getCityList, []);
  useEffect(getCompanyList, []);

  // Filter out selected cities and companies from the options list
  const availableCities = cityList.filter(city => !citySelected.includes(city));
  const availableCompanies = companyList
    .map(i => i.fullname)
    .filter(company => !companySelected.includes(company));

  return (
    <div style={{ textAlign: 'right' }}>
      <div style={{ marginBottom: 16 }}>
        <Autocomplete
          options={availableCities}
          onChange={handleCityChange}
          renderInput={(params) => (
            <TextField
              dir="rtl"
              {...params}
              label="انتخاب شهر"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              fullWidth
            />
          )}
        />
      </div>
      <Stack 
        direction="row" 
        spacing={2} 
        mt={2} 
        justifyContent="flex-end" 
        sx={{ flexWrap: 'wrap', gap: 1 }} 
      >
        {citySelected.map((city, index) => (
          <Chip
            key={`city-${index}`}
            label={city || "Unknown City"}
            onDelete={() => handleDelete(city, 'city')}
            deleteIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
            sx={{
              ml: 0.5,
              mr: 0.5,
              mt: 0.5,
              color: 'white',
              bgcolor: 'red',
              '&:hover': {
                bgcolor: 'red',
                boxShadow: 6,
              },
              borderRadius: '50%',
              p: 1,
              transition: 'all 0.3s ease',
              boxShadow: 3,
              '&:focus': {
                outline: 'none',
              },
              '& .MuiChip-deleteIcon': {
                color: 'white', 
                backgroundColor: 'red',
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: 'red',
                },
              },
            }}
          />
        ))}
      </Stack>

      <div style={{ marginBottom: 16 }}>
        <Autocomplete
          options={availableCompanies}
          onChange={handleCompanyChange}
          renderInput={(params) => (
            <TextField
              dir="rtl"
              {...params}
              label="انتخاب شرکت"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              fullWidth
            />
          )}
        />
      </div>
      <Stack 
        direction="row" 
        spacing={2} 
        mt={2} 
        justifyContent="flex-end" 
        sx={{ flexWrap: 'wrap', gap: 1 }} 
      >
        {companySelected.map((company, index) => (
          <Chip
            key={`company-${index}`}
            label={company || "Unknown Company"}
            onDelete={() => handleDelete(company, 'company')}
            deleteIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
            sx={{
              ml: 0.5,
              mr: 0.5,
              mt: 0.5,
              color: 'white',
              bgcolor: 'red', 
              '&:hover': {
                bgcolor: 'red', 
                boxShadow: 6,
              },
              borderRadius: '50%',
              p: 1,
              transition: 'all 0.3s ease',
              boxShadow: 3,
              '&:focus': {
                outline: 'none',
              },
              '& .MuiChip-deleteIcon': {
                color: 'white', // Ensure the delete icon is white
                backgroundColor: 'red',
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: 'red',
                },
              },
            }}
          />
        ))}
      </Stack>
    </div>
  );
};

export default CompanyCity;
