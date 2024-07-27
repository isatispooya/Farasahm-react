import React, { useState } from "react";

const AccessFilter = ({ onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleCheckboxChange = (option) => {
    const newSelectedOption = option === selectedOption ? "" : option;
    setSelectedOption(newSelectedOption);
    onFilterChange(newSelectedOption);
  };

  return (
    <>
      <h3 className="mb-5 text-lg font-medium text-black">انتخاب کنید:</h3>
      <ul className="grid w-full gap-6 md:grid-cols-3">
        <li>
          <input
            type="checkbox"
            id="react-option"
            checked={selectedOption === "سهامداران"}
            onChange={() => handleCheckboxChange("سهامداران")}
            className="hidden peer"
            required=""
          />
          <label
            htmlFor="react-option"
            className="inline-flex items-center justify-between w-full p-5 text-black bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gray-50 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">سهامداران</div>
              <div className="w-full text-sm">دسترسی, تماس, مشاهده , فیلتر</div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            id="flowbite-option"
            checked={selectedOption === "مشتریان"}
            onChange={() => handleCheckboxChange("مشتریان")}
            className="hidden peer"
          />
          <label
            htmlFor="flowbite-option"
            className="inline-flex items-center justify-between w-full p-5 text-black bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gray-50 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">مشتریان</div>
              <div className="w-full text-sm">دسترسی, تماس, مشاهده , فیلتر</div>
            </div>
          </label>
        </li>

      </ul>
    </>
  );
};

export default AccessFilter;


