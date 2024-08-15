import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { CiCalendarDate } from "react-icons/ci";
import { DateObject } from "react-multi-date-picker";

const DateBirthBors = ({ config = {}, setConfig }) => {

    const insuranceConfig = config.insurance || {};
    const [from, setFrom] = useState(insuranceConfig.issuance_date?.from ?? null);
    const [to, setTo] = useState(insuranceConfig.issuance_date?.to ?? null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const openDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleChange = (newValue, type) => {
      if (type === "from") {
        setFrom(newValue);
        const issuanceDate = { from: newValue, to };
        const insurance = { ...insuranceConfig, issuance_date: issuanceDate };
        setConfig((prevConfig) => ({ ...prevConfig, insurance }));
      } else if (type === "to") {
        setTo(newValue);
        const issuanceDate = { from, to: newValue };
        const insurance = { ...insuranceConfig, issuance_date: issuanceDate };
        setConfig((prevConfig) => ({ ...prevConfig, insurance }));
      }
    };

    return (
      <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
        <button
          onClick={openDropdown}
          className="w-full text-xl font-bold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
        >
         تاریخ صدور 
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
              <div className="flex items-center mb-2 mr-8">
                <CiCalendarDate />
                <p className="text-center">تاریخ شروع</p>
              </div>
              <div>
                <DatePicker
                  calendar={persian}
                  value={
                    from
                      ? new DateObject({
                          date: from,
                          calendar: persian,
                        })
                      : null
                  }
                  onChange={(value) => handleChange(value, "from")}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  className="w-full bg-white p-2 rounded shadow-md"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center mb-2 mr-8">
                <CiCalendarDate />
                <p className="text-center">تاریخ پایان</p>
              </div>
              <div>
                <DatePicker
                  calendar={persian}
                  value={
                    to
                      ? new DateObject({
                          date: to,
                          calendar: persian,
                        })
                      : null
                  }
                  onChange={(value) => handleChange(value, "to")}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  className="w-full bg-white p-2 rounded shadow-md"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default DateBirthBors;
