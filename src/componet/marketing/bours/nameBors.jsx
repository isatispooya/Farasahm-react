import React, { useState, useEffect } from "react";
import { Button, Chip, Stack, TextField } from "@mui/material";

const NameBors = ({ config, setConfig }) => {
  const [searchName, setSearchName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchName = (e) => {
    const value = e.target.value;
    if (/^[\u0600-\u06FFa-zA-Z\s]*$/.test(value)) {
      setSearchName(value);
    }
  };
  const addName = () => {
    const name_list = config.bours.name ?? [];

    if (searchName && !name_list.includes(searchName)) {
      const updatedNameList = [...name_list, searchName];
      const bours = {
        ...config.bours,
        name: updatedNameList,
      };
      setConfig({ ...config, bours: bours });
      setSearchName("");
    }
  };
  const removeName = (name) => {
    const name_list = config.bours.name ?? [];
    const updatedNameList = name_list.filter(
      (existingName) => existingName !== name
    );
    const bours = {
      ...config.bours,
      name: updatedNameList,
    };
    setConfig({ ...config, bours: bours });
  };

  const KeyDownName = (e) => {
    if (e.key === "Enter") {
      addName();
    }
  };

  const openDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
      <div>
        <button
          onClick={openDropdown}
          className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          نام و نام خانوادگی
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`inline-block ml-2 h-5 w-5 transform transition-transform duration-300 ${
              isDropdownOpen
                ? "rotate-180 duration-500"
                : "rotate-0 duration-500"
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
          <div className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg">

          <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
              <TextField
                style={{ backgroundColor: "white", marginLeft: "20px" }}
                id="outlined-basic-name"
                value={searchName}
                onChange={handleSearchName}
                onKeyDown={KeyDownName}
                label="جستجو نام و نام خانوادگی"
                variant="outlined"
                inputProps={{
                  inputMode: "text",
                  pattern: "[\u0600-\u06FFa-zA-Zs]*",
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />

              <Button
                onClick={addName}
                sx={{ borderRadius: 2 }}
                variant="contained"
              >
                افزودن
              </Button>
            </div>

            {config.bours.name && config.bours.name.length > 0 && (
              <Stack
                direction="row"
                spacing={1}
                mt={2}
                justifyContent="flex-start"
                sx={{ flexWrap: "wrap" }}
              >
                {(config.bours.name || []).map((item, index) => (
                  <Chip
                    key={`name-${index}`}
                    label={item}
                    onDelete={() => removeName(item)}
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NameBors;
