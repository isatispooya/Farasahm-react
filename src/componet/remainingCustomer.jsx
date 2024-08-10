import { Box, TextField, Typography, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const RemainingCustomer = ({ config, setConfig }) => {
  // Ensure default values for nested properties
  const insurance = config?.insurance || {};
  const accounting = insurance.accounting || {};

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [from, setFrom] = useState(accounting.from || "");
  const [to, setTo] = useState(accounting.to || "");
  const [code, setCode] = useState(accounting.code || "03");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };


  useEffect(() => {
    const newAccounting = { from, to, code };
    const newInsurance = { ...insurance, accounting: newAccounting };
    setConfig({ ...config, insurance: newInsurance });
  }, [from, to, code, config, insurance, setConfig]);

  const codeItems = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09"
  ];

  return (
    <>
      <div dir="rtl" className="max-w-3xl mx-auto bg-gray-100 rounded-lg">
        <ToastContainer />
        <button
          onClick={toggleDropdown}
          className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          مانده مشتری
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
          <>
            <Box
              sx={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  marginTop: "15px",
                  marginLeft: "20px",
                }}
              >
                مانده مشتری
              </Typography>
              <Box sx={{ marginLeft: "40px", paddingBottom: "20px" }}>
                <TextField
                  sx={{ marginRight: "5px", backgroundColor: "white" }}
                  id="outlined-basic"
                  label="مانده از"
                  variant="outlined"
                  value={from}
                  onChange={handleInputChange(setFrom)}
                />
                
                <TextField
                  sx={{ marginRight: "5px", backgroundColor: "white" }}
                  id="outlined-basic"
                  label="مانده تا"
                  variant="outlined"
                  value={to}
                  onChange={handleInputChange(setTo)}
                  style={{ marginBottom: 16 }}
                />

                <TextField
                  select
                  sx={{ marginRight: "5px", backgroundColor: "white" }}
                  id="outlined-basic"
                  label="کد"
                  variant="outlined"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  style={{ marginBottom: 16 }}
                >
                  {codeItems.map((codeItem, index) => (
                    <MenuItem key={index} value={codeItem}>
                      {codeItem}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          </>
        )}
      </div>
    </>
  );
};

export default RemainingCustomer;
