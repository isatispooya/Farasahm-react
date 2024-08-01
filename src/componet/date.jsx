import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function Example() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      dir="rtl"
      className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg"
    >
      <button
        onClick={toggleDropdown}
        className="w-full text-xl font-bold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
      >
        انتخاب تاریخ تولد
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
        <div className="mt-2 bg-gray-200 p-4 rounded-lg shadow-md flex justify-between gap-4">
          <div className="flex-1">
            <p className="text-center font-semibold mb-2">از تاریخ</p>
            <DatePicker
              calendar={persian}
              value={from}
              onChange={setFrom}
              locale={persian_fa}
              calendarPosition="bottom-right"
              className="w-full bg-white p-2 rounded shadow-md"
            />
          </div>
          <div className="flex-1">
            <p className="text-center font-semibold mb-2">تا تاریخ</p>
            <DatePicker
              calendar={persian}
              value={to}
              onChange={setTo}
              locale={persian_fa}
              calendarPosition="bottom-left"
              className="w-full bg-white p-2 rounded shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}
