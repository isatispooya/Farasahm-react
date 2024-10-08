import React, { useState, useEffect } from "react";
import { Button, Chip, Stack } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MordBime = ({ access, config, setConfig }) => {
  const [dropdown, setDropdown] = useState(false);
  const [MordList, setMordList] = useState([]);
  const [MordInput, setMordInput] = useState("");

  useEffect(() => {
    const fetchMordList = async () => {
      const settings = {
        url: "https://b.fidip.ir/marketing/insurance_item",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          access: ["6406d4bb6ce0fd6d33dd1553", "marketing"],
        }),
      };

      try {
        const response = await axios(settings);
        setMordList(response.data);
      } catch (error) {
        console.error("Failed to fetch Mord list", error);
      }
    };
    fetchMordList();
  }, []);

  const AddMord = () => {
    if (MordInput && MordList.includes(MordInput)) {
      const symbolList = [...(config.insurance?.insurance_item || [])];
      symbolList.push(MordInput);
      const insurance = { ...config.insurance, insurance_item: symbolList };
      setConfig({ ...config, insurance });
      setMordInput("");
    } else {
      toast.error("لطفا یک مورد معتبر انتخاب کنید");
    }
  };

  const Remove = (itemToRemove) => {
    const itemsList = (config.insurance.insurance_item || []).filter(
      (item) => item !== itemToRemove
    );
    const insurance = {
      ...config.insurance,
      insurance_item: itemsList,
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
        <div className="flex flex-col mt-3 space-y-4 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
          <div className="mb-2 mt-2 flex items-center space-x-4 space-x-reverse">
            <input
              list="mordList"
              value={MordInput}
              onChange={handleMordSelect}
              placeholder="جستجوی مورد بیمه"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              style={{ marginBottom: 16, backgroundColor: "white" }}
            />
            <datalist id="mordList">
              {MordList.map((mord, index) => (
                <option key={index} value={mord}>
                  {mord}
                </option>
              ))}
            </datalist>
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
            spacing={1}
            mt={2}
            justifyContent="flex-start"
            sx={{ flexWrap: "wrap" }}
          >
            {(config.insurance.insurance_item || []).map((item, index) => (
              <Chip
                key={`mored-${index}`}
                label={item}
                onDelete={() => Remove(item)}
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
                  marginBottom: "10px",
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

export default MordBime;

