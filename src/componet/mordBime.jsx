import React, { useState } from "react";
import { Button, TextField, Autocomplete } from "@mui/material";

const MordBime = ({ config, setConfig }) => {
  const [search, setSearch] = useState("");
  
  const [dropDown, setDropDown] = useState(false);
  

  const AddMord = () => {
    if (search && !config.insurance.insurance_item.includes(search)) {
      setSearch("");
      let insurance_item_list = [...config.insurance.insurance_item, search];
      const insurance = {
        ...config,
        insurance: { ...config.insurance, insurance_item: insurance_item_list },
      };
      setConfig(insurance);
    }
  };

  const Remove = (id) => {
    let i_item_list = config.insurance.insurance_item;
    i_item_list = i_item_list.filter((i) => i !== id);
    let insurance = { ...config.insurance, insurance_item: i_item_list };
    setConfig({ ...config, insurance: insurance });
  };

  const search_mord_filter = (e) => {
    const value = e.target.value;
    if (/^[\u0600-\u06FFa-zA-Z\s]*$/.test(value)) {
      setSearch(value);
    }
  };

  const useEnterKey = (e) => {
    if (e.key === "Enter") {
      AddMord();
    }
  };
  const openDropdown = () => {
    setDropDown(!dropDown);
  };

  return (
    <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
      <div>
        <button
          onClick={openDropdown}
          className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          مورد بیمه
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`inline-block ml-2 h-5 w-5 transform transition-transform duration-300 ${
              dropDown ? "rotate-180 duration-500" : "rotate-0 duration-500"
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
          <div className="mt-2 bg-gray-200 p-4 rounded-lg shadow-md">
            <div className="mb-2 mt-8 flex items-center space-x-4">
              <TextField
                style={{ backgroundColor: "white", marginLeft: "20px" }}
                id="outlined-basic-name"
                value={search}
                onChange={search_mord_filter}
                onKeyDown={useEnterKey}
                label="جستجو"
                variant="outlined"
                inputProps={{
                  inputMode: "text",
                  pattern: "[\u0600-\u06FFa-zA-Z\\s]*",
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />

              <Button
                onClick={AddMord}
                sx={{ borderRadius: 2 }}
                variant="contained"
              >
                افزودن
              </Button>
            </div>

            {config.insurance.insurance_item &&
              config.insurance.insurance_item.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {config.insurance.name.map((insurance_item) => (
                    <div
                      key={insurance_item}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      <span className="mr-2 text-lg font-medium">
                        {insurance_item}
                      </span>
                      <button
                        onClick={() => Remove(insurance_item)}
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
                    </div>
                  ))}
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MordBime;
