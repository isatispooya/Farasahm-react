import React, { useEffect, useState } from "react";
import { Autocomplete, Button, Chip, Stack, TextField } from "@mui/material";
import axios from "axios";
import { OnRun } from "../config/config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const CompanyFilter = ({ access, config, setConfig }) => {
  const [companyList, setCompanyList] = useState([]);
  const [companyInput, setCompanyInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [companySelected, setCompanySelected] = useState([]);

  useEffect(() => {
    // Initialize companySelected from config.nobours.symbol if available
    if (config.nobours?.symbol && config.nobours.symbol.length > 0) {
      setCompanySelected(config.nobours.symbol);
    }
  }, [config.nobours?.symbol]);

  useEffect(() => {
    // Update the config with selected companies
    const symbols = companySelected
      .map((selectedCompany) => {
        const foundCompany = companyList.find(
          (company) => company.fullname === selectedCompany
        );
        return foundCompany ? foundCompany.symbol : null;
      })
      .filter((symbol) => symbol !== null);

    const updatedConfig = {
      ...config,
      nobours: { ...config.nobours, symbols: companySelected },
    };
    setConfig(updatedConfig);
  }, [companySelected, companyList, config, setConfig]);

  useEffect(() => {
    // Fetch company list on component mount
    const fetchCompanyList = async () => {
      try {
        const response = await axios.post(`${OnRun}/marketing/symbolregisternobours`, {
          access,
        });
        setCompanyList(response.data);
      } catch (error) {
        console.error("Failed to fetch company list", error);
      }
    };
    fetchCompanyList();
  }, [access]);

  const handleCompanyChange = (event, newValue) => {
    setCompanyInput(newValue);
  };

  const handleAddCompany = () => {
    if (
      companyInput &&
      availableCompanies.includes(companyInput) &&
      !companySelected.includes(companyInput)
    ) {
      setCompanySelected((prev) => [...prev, companyInput]);
      setCompanyInput("");
    } else {
      toast.error("لطفا یک شرکت معتبر انتخاب کنید");
    }
  };

  const handleDelete = (item) => {
    setCompanySelected((prev) => prev.filter((company) => company !== item));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const availableCompanies = companyList
    .map((i) => i.fullname)
    .filter((company) => !companySelected.includes(company));

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
            {companySelected.map((company, index) => (
              <Chip
                key={`company-${index}`}
                label={company || "Unknown Company"}
                onDelete={() => handleDelete(company)}
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

export default CompanyFilter;
