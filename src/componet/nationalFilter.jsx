import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { citi_list } from "./marketing/city_list";
const NationalIdSearch = ({ config, setConfig }) => {
  const [searchTermPrimary, setSearchTermPrimary] = useState("");
  const [filteredCities, setFilteredCities] = useState(citi_list);
  const [cityselected, setCityselected] = useState("");

  // جستجو و افزودن کد ملی به صورت مستقیم
  const handle_search_number_national_code = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setSearchTermPrimary(value);
  };



  const handleRemovePrimary = (id) => {
    var nc_list = config.nobours.national_id;
    nc_list = nc_list.filter(i => i!=id)
    var nobours = { ...config.nobours, national_id: nc_list };
    setConfig({ ...config, nobours: nobours });
  };

  const set_city_by_name = (e) => {
    const value = e.target.value;
    const availibale = filteredCities.filter(i=>i.num==value)
    if (availibale.length>0) {
      setCityselected(value)
    }
  };

  const add_num_to_config = () => {
    var nc_list = config.nobours.national_id;
    var nobours
    if (searchTermPrimary) {
      nc_list.push(searchTermPrimary);
      nobours = { ...config.nobours, national_id: nc_list };
      setConfig({ ...config, nobours: nobours });
      setSearchTermPrimary("");
      setCityselected('')
    }else if (cityselected) {
      nc_list.push(cityselected);
      nobours = { ...config.nobours, national_id: nc_list };
      setConfig({ ...config, nobours: nobours });
      setCityselected('')
      setSearchTermPrimary("");

    }
  };

  return (
    <div dir="rtl" className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg">
      <div className="flex items-center space-x-4">
        <TextField
          style={{ backgroundColor: "white", flex: 1, marginLeft: "10px" }}
          value={searchTermPrimary}
          onChange={handle_search_number_national_code}
          label="جستجو کد ملی"
          variant="outlined"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
        />



        <Button
          onClick={add_num_to_config}
          sx={{ borderRadius: 2, marginLeft: "20px" }}
          variant="contained"
        >
          افزودن
        </Button>
      </div>

      <div className="mt-2 bg-gray-200 p-2 rounded-lg shadow-md">
        <input value={cityselected} list="city" onChange={set_city_by_name}/>
        <datalist id="city" >
          {filteredCities.length > 0 &&
            filteredCities.map((i) => {
              return (
                <option key={  Math.floor(1000000000 * (Math.random()+2))} value={i.num}>
                  {i.city}
                </option>
              );
            })}
        </datalist>
      </div>

      {config.nobours.national_id.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {config.nobours.national_id.map((id) => (
            <div
              key={id}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="mr-2 text-lg font-medium">{id}</span>
              <button
                onClick={() => handleRemovePrimary(id)}
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
  );
};

export default NationalIdSearch;
