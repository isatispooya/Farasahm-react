import React, { useState } from "react";
import { TextField } from "@mui/material";

const PaymentBime = ({
  config = {
    insurance: { payment: { min: "", max: "" } },
  },
  setConfig,
}) => {
  const [dropDown, setDropdown] = useState(false);

  const formatNumber = (num) => {
    if (!num) return "";
    const numStr = num.replace(/,/g, "");
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const openDropdown = () => {
    setDropdown(!dropDown);
  };

  const handleButtonClick_payment_min = (value) => {
    const rawValue = value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue)) {
      let payment = {
        ...config.insurance.payment,
        min: formatNumber(rawValue),
      };
      let insurance = { ...config.insurance, payment: payment };
      setConfig({ ...config, insurance });
    }
  };

  const handleButtonClick_payment_max = (value) => {
    const rawValue = value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue)) {
      let payment = {
        ...config.insurance.payment,
        max: formatNumber(rawValue),
      };
      let insurance = { ...config.insurance, payment: payment };
      setConfig({ ...config, insurance });
    }
  };

  const handleButtonClick_fee_min = (value) => {
    const rawValue = value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue)) {
      let fee = {
        ...config.insurance.fee,
        min: formatNumber(rawValue),
      };
      let insurance = { ...config.insurance, fee: fee };
      setConfig({ ...config, insurance });
    }
  };

  const handleButtonClick_fee_max = (value) => {
    const rawValue = value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue)) {
      let fee = {
        ...config.insurance.fee,
        max: formatNumber(rawValue),
      };
      let insurance = { ...config.insurance, fee: fee };
      setConfig({ ...config, insurance });
    }
  };

  return (
    <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
      <button
        onClick={openDropdown}
        className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
      >
        کارمزد و حق بیمه
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`inline-block ml-2 h-5 w-5 transform transition-transform duration-300 ${
            dropDown ? "rotate-180" : "rotate-0"
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

      {dropDown && (
        <div className="mt-2 bg-gray-200 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2 bg-gray-200 p-2"></div>

          <div className="flex flex-col justify-between items-center mb-5 bg-gray-200 p-2">
            <div className="text-right text-lg font-bold w-full mb-3">
              {" "}
              حق بیمه
            </div>
            <div className="flex justify-between space-x-4 w-full">
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  className=" p-2 shadow-md text-center border border-gray-300 rounded"
                  id="payment-min"
                  label="از"
                  value={formatNumber(config.insurance?.payment?.min)}
                  onChange={(e) =>
                    handleButtonClick_payment_min(e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  id="payment-max"
                  label="تا"
                  value={formatNumber(config.insurance?.payment?.max)}
                  onChange={(e) =>
                    handleButtonClick_payment_max(e.target.value)
                  }
                  className=" p-2 shadow-md text-center border border-gray-300 rounded"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            </div>

            <div className="text-right text-lg font-bold w-full mb-3 mt-3">
              {" "}
              کارمزد{" "}
            </div>
            <div className="flex justify-between space-x-4 w-full">
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  className=" p-2 shadow-md text-center border border-gray-300 rounded"
                  id="fee-min"
                  label="از"
                  value={formatNumber(config.insurance?.fee?.min)}
                  onChange={(e) => handleButtonClick_fee_min(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="text-right w-1/2">
                <TextField
                  style={{ backgroundColor: "white" }}
                  id="fee-max"
                  label="تا"
                  value={formatNumber(config.insurance?.fee?.max)}
                  onChange={(e) => handleButtonClick_fee_max(e.target.value)}
                  className="p-2 shadow-md text-center border border-gray-300 rounded"
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

export default PaymentBime;
