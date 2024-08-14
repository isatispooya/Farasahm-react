import { TextField } from "@mui/material";
import React, { useState } from "react";

const Stocks = ({
  config = {
    nobours: { amount: { from: "", to: "" }, rate: { min: "", max: "" } },
  },
  setConfig,
}) => {
  // Function to format number with commas
  const formatNumber = (num) => {
    if (!num) return "";
    const numStr = num.replace(/,/g, "");
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle change in "from" value for the number of shares
  const handleButtonClick_amount_from = (value) => {
    const rawValue = value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue) && rawValue >= 0) {
      let amount = { ...config.nobours.amount, from: rawValue }; // Store raw value without commas
      let nobours = { ...config.nobours, amount: amount };
      setConfig({ ...config, nobours });
    }
  };

  // Handle change in "to" value for the number of shares
  const handleButtonClick_amount_to = (value) => {
    const rawValue = value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue) && rawValue >= 0) {
      let amount = { ...config.nobours.amount, to: rawValue }; // Store raw value without commas
      let nobours = { ...config.nobours, amount: amount };
      setConfig({ ...config, nobours });
    }
  };

  // Handle change in "min" value for the percentage of shares
  const handleButtonClick_rate_min = (value) => {
    const rawValue = value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue) && rawValue >= 0 && rawValue <= 100) {
      let rate = { ...config.nobours.rate, min: rawValue }; // Store raw value without commas
      let nobours = { ...config.nobours, rate: rate };
      setConfig({ ...config, nobours });
    }
  };

  // Handle change in "max" value for the percentage of shares
  const handleButtonClick_rate_max = (value) => {
    const rawValue = value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue) && rawValue >= 0 && rawValue <= 100) {
      let rate = { ...config.nobours.rate, max: rawValue }; // Store raw value without commas
      let nobours = { ...config.nobours, rate: rate };
      setConfig({ ...config, nobours });
    }
  };

  return (
    <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
      <button
        onClick={toggleDropdown}
        className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
      >
        سهام
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
        <div className="mt-2 bg-gray-200 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2 bg-gray-200 p-2">
            <div className="text-right text-lg font-bold w-full">
              تعداد سهام
            </div>
            <div className="flex justify-between space-x-4 w-full">
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  id="amount-from"
                  label="از"
                  value={formatNumber(config.nobours?.amount?.from)}
                  onChange={(e) =>
                    handleButtonClick_amount_from(e.target.value)
                  }
                  className="w-full p-2 text-center border border-gray-300 rounded shadow-md"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  id="amount-to"
                  label="تا"
                  value={formatNumber(config.nobours?.amount?.to)}
                  onChange={(e) => handleButtonClick_amount_to(e.target.value)}
                  className="w-full p-2 text-center border border-gray-300 rounded shadow-md"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-5 bg-gray-200 p-2">
            <div className="text-right text-lg font-bold w-full">درصد سهام</div>
            <div className="flex justify-between space-x-4 w-full">
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  className="w-full p-2 shadow-md text-center border border-gray-300 rounded"
                  id="rate-min"
                  label="از"
                  value={formatNumber(config.nobours?.rate?.min)}
                  onChange={(e) => handleButtonClick_rate_min(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  id="rate-max"
                  label="تا"
                  value={formatNumber(config.nobours?.rate?.max)}
                  onChange={(e) => handleButtonClick_rate_max(e.target.value)}
                  className="w-full p-2 shadow-md text-center border border-gray-300 rounded"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stocks;
