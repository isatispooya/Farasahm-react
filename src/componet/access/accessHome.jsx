import React from "react";

const accessHome = () => {
  return (
    <>
      <fieldset>
        <legend className="sr-only">دسترسی</legend>

        <div className="flex items-center justify- mb-4">
          <input
            id="country-option-1"
            type="radio"
            name="countries"
            value="USA"
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked
          />
          <label
            for="country-option-1"
            className="block ms-2  text-sm  text-gray-900 dark:text-gray-900 font-bold"
          >
            سهامدراران
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input
            id="country-option-2"
            type="radio"
            name="countries"
            value="Germany"
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600 "
          />
          <label
            for="country-option-2"
            className="block ms-2 text-sm  text-gray-900 dark:text-gray-900 font-bold"
          >
            مشتریان
          </label>
        </div>
      </fieldset>
    </>
  );
};

export default accessHome;
