import { TextField } from "@mui/material";
import React, { useState } from "react";

const BalanceBours = ({ config, setConfig }) => {
  const formatNumber = (num) => {
    if (!num) return "";
    const numStr = num.replace(/,/g, "");
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleButtonClick_remain_from = (value) => {
    const rawValue = value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue) && rawValue >= 0) {
      let remain = { ...config.bours.remain, from: formatNumber(rawValue) };
      let bours = { ...config.bours, remain };
      setConfig({ ...config, bours });
    }
  };

  const handleButtonClick_remain_to = (value) => {
    const rawValue = value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue) && rawValue >= 0) {
      let remain = { ...config.bours.remain, to: formatNumber(rawValue) };
      let bours = { ...config.bours, remain };
      setConfig({ ...config, bours });
    }
  };

  const handleButtonClick_credit_balance_from = (value) => {
    const rawValue = value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue) && rawValue >= 0) {
      let credit_balance = { ...config.bours.credit_balance, from: formatNumber(rawValue) };
      let bours = { ...config.bours, credit_balance };
      setConfig({ ...config, bours });
    }
  };

  const handleButtonClick_credit_balance_to = (value) => {
    const rawValue = value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue) && rawValue >= 0) {
      let credit_balance = { ...config.bours.credit_balance, to: formatNumber(rawValue) };
      let bours = { ...config.bours, credit_balance };
      setConfig({ ...config, bours });
    }
  };

  return (
    <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
      <button
        onClick={toggleDropdown}
        className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
      >
        مانده
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
            <div className="text-right text-lg font-bold w-full">مانده</div>
            <div className="flex justify-between space-x-4 w-full">
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  id="amount-from"
                  label="از"
                  value={formatNumber(config.bours.remain.from)}
                  onChange={(e) => handleButtonClick_remain_from(e.target.value)}
                  className="w-full p-2 text-center border border-gray-300 rounded shadow-md"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  id="amount-to"
                  label="تا"
                  value={formatNumber(config.bours.remain.to)}
                  onChange={(e) => handleButtonClick_remain_to(e.target.value)}
                  className="w-full p-2 text-center border border-gray-300 rounded shadow-md"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-5 bg-gray-200 p-2">
            <div className="text-right text-lg font-bold w-full">
              مانده اعتبار
            </div>
            <div className="flex justify-between space-x-4 w-full">
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  className="w-full p-2 shadow-md text-center border border-gray-300 rounded"
                  id="amount-from"
                  label="از"
                  value={formatNumber(config.bours.credit_balance.from)}
                  onChange={(e) => handleButtonClick_credit_balance_from(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  id="amount-to"
                  label="تا"
                  value={formatNumber(config.bours.credit_balance.to)}
                  onChange={(e) => handleButtonClick_credit_balance_to(e.target.value)}
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

export default BalanceBours;

