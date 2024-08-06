import { TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const Stocks = ({ config, setConfig }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(null);

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  useEffect(() => {
    const amount = { from: input1, to: input2 };
    const nobours = { ...config, amount: amount };
    setConfig({ ...config, nobours: nobours });
  }, [input1, input2]);

  useEffect(() => {
    const rate = { from: input3, to: input4 };
    const nobours = { ...config, rate: rate };
    setConfig({ ...config, nobours: nobours });
  }, [input3, input4]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleButtonClick = () => {
    setSelectedValues({
      amount: { from: input1, to: input2 },
      rate: { min: input3, max: input4 },
    });
  };

  const amountFrom = config.nobours?.amount?.from || "";
  const amountTo = config.nobours?.amount?.to || "";
  const rateMin = config.nobours?.rate?.min || "";
  const rateMax = config.nobours?.rate?.max || "";

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
        <div className="mt-2 bg-gray-200 p-4 rounded-lg ">
          <div className="flex justify-between items-center mb-2 bg-gray-200 p-2">
            <div className="text-right text-lg font-bold w-full">
              تعداد سهام
            </div>

            <div className="flex justify-between space-x-4 w-full">
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  id="outlined-number"
                  label="از"
                  type="number"
                  value={amountFrom}
                  onChange={handleInputChange(setInput1)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-full p-2 text-center border border-gray-300 rounded shadow-md"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  id="outlined-number"
                  label="تا"
                  type="number"
                  value={amountTo}
                  onChange={handleInputChange(setInput2)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-full p-2 text-center border border-gray-300 rounded shadow-md"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  id="outlined-number"
                  label="از"
                  type="number"
                  value={rateMin}
                  variant="outlined"
                  onChange={handleInputChange(setInput3)}
                  inputMode="numeric"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  id="outlined-number"
                  label="تا"
                  type="number"
                  value={rateMax}
                  variant="outlined"
                  pattern="[0-9]*"
                  onChange={handleInputChange(setInput4)}
                  className="w-full p-2 shadow-md text-center border border-gray-300 rounded"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleButtonClick}
              sx={{ borderRadius: 2 }}
              variant="contained"
            >
              تایید انتخاب
            </Button>
          </div>

          {selectedValues && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">
                مقادیر انتخاب شده:
              </h3>
              <p className="mt-2">
                <strong>تعداد سهام:</strong> از {selectedValues.amount.from} تا{" "}
                {selectedValues.amount.to}
              </p>
              <p className="mt-2">
                <strong>درصد سهام:</strong> از {selectedValues.rate.min} تا{" "}
                {selectedValues.rate.max}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Stocks;
