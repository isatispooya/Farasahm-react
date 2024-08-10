import React, { useState, useEffect } from "react";
import { Button, Chip, Stack, TextField } from "@mui/material";
import axios from "axios";
import { OnRun } from "../config/config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const MordBime = ({ access, config, setConfig }) => {
  const [dropdown, setDropdown] = useState(false);
  const [MordList, setMordList] = useState([]);
  const [MordInput, setMordInput] = useState("");

  useEffect(() => {
    const fetchMordList = async () => {
      try {
        const response = await axios.post(`${OnRun}/marketing/insurance_item`, {
          access: access,
        });
        
        setMordList(response.data);
      } catch (error) {
        console.error("Failed to fetch Mord list", error);
      }
    };
    fetchMordList();
  }, [access]);

  const AddMord = () => {
    const available = MordList.some((mord) => mord.symbol === MordInput);
    if (available) {
      const itemsList = [...(config.config.insurance.insurance_item || [])];
      itemsList.push(MordInput);
      const insurance = { 
        ...config.config.insurance, 
        insurance_item: itemsList 
      };
      setConfig({ ...config, insurance: insurance });
      setMordInput("");
    } else {
      toast.error("لطفا یک مورد معتبر انتخاب کنید");
    }
  };

  const Remove = (itemToRemove) => {
    const itemsList = (config.config.insurance.insurance_item || []).filter(
      (item) => item !== itemToRemove
    );
    const insurance = { 
      ...config.config.insurance, 
      insurance_item: itemsList 
    };
    setConfig({ ...config, insurance: insurance });
  };

  const openDropDown = () => {
    setDropdown(!dropdown);
  };

  const handleMordSelect = (event) => {
    setMordInput(event.target.value);
  };

  return (
    <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
      <ToastContainer />
      <button
        onClick={openDropDown}
        className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
      >
        مورد بیمه
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`inline-block ml-2 h-5 w-5 transform transition-transform duration-300 ${
            dropdown ? "rotate-180" : "rotate-0"
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
      {dropdown && (
        <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
          <div className="mb-2 mt-2 flex items-center space-x-4 space-x-reverse">
            <TextField
              select
              value={MordInput}
              onChange={handleMordSelect}
              label="مورد"
              variant="outlined"
              SelectProps={{ native: true }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              style={{ marginBottom: 16 }}
            >
              <option value="" disabled>
                 
              </option>
              {MordList.map((mord) => (
                <option key={mord.symbol} value={mord.symbol}>
                  {mord.name}
                </option>
              ))}
            </TextField>
          </div>
          <Button
            onClick={AddMord}
            sx={{ borderRadius: 2 }}
            variant="contained"
          >
            افزودن
          </Button>

          <Stack
            direction="row"
            spacing={2}
            mt={2}
            justifyContent="flex-end"
            sx={{ flexWrap: "wrap", gap: 1, direction: "rtl" }}
          >
            {(config.config.insurance.insurance_item || []).map((item, index) => (
              <Chip
                key={index}
                label={item}
                onDelete={() => Remove(item)}
                color="primary"
              />
            ))}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default MordBime;
