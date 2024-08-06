import React, { useEffect, useState } from "react";
import { Button, Chip, MenuItem, Stack, TextField } from "@mui/material";
import axios from "axios";
import { OnRun } from "../config/config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const CompanyFilter = ({ access, config, setConfig }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [companyInput, setCompanyInput] = useState("");

  useEffect(() => {
    const fetchCompanyList = async () => {
      try {
        const response = await axios.post(
          `${OnRun}/marketing/symbolregisternobours`,
          { access }
        );
        setCompanyList(response.data);
      } catch (error) {
        console.error("Failed to fetch company list", error);
      }
    };
    fetchCompanyList();
  }, [access]);

  const handleAddCompany = () => {
    const available = companyList.some(
      (company) => company.symbol === companyInput
    );
    if (available) {
      const symbolList = [...(config.nobours?.symbol || [])];
      symbolList.push(companyInput);
      const nobours = { ...config.nobours, symbol: symbolList };
      setConfig({ ...config, nobours });
      setCompanyInput("");
    } else {
      toast.error("لطفا یک شرکت معتبر انتخاب کنید");
    }
  };

  const handleDelete = (companySymbol) => {
    const symbolList = (config.nobours?.symbol || []).filter(
      (symbol) => symbol !== companySymbol
    );
    const nobours = { ...config.nobours, symbol: symbolList };
    setConfig({ ...config, nobours });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCompanySelect = (event) => {
    setCompanyInput(event.target.value);
  };

  const availableCompanies = companyList.filter(
    (company) => !(config.nobours?.symbol || []).includes(company.symbol)
  );

  return (
    <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
      <ToastContainer />
      <button
        onClick={toggleDropdown}
        className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
      >
        شرکت
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
            <TextField
              select
              value={companyInput}
              onChange={handleCompanySelect}
              label="شرکت"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              variant="outlined"
              style={{ marginBottom: 16 }}
            >
              {availableCompanies.map((i) => {
                return (
                  <MenuItem value={i.symbol} key={i.symbol}>
                    {i.fullname}
                  </MenuItem>
                );
              })}
            </TextField>

            <Button
              onClick={handleAddCompany}
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
            {(config.nobours?.symbol || []).map((companySymbol, index) => {
              const companyInfo = companyList.find(
                (i) => i.symbol === companySymbol
              );
              const name = companyInfo?.fullname || companySymbol;
              return (
                <Chip
                  key={`company-${index}`}
                  label={name}
                  onDelete={() => handleDelete(companySymbol)}
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
              );
            })}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default CompanyFilter;
