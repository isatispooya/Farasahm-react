import React from "react";

const Accordion = ({
  items,
  checkedItems,
  onCheckboxChange,
  searchQuery,
  onSearchChange,
  buttonText,
  isOpen,
  onToggle,
}) => {
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      dir="rtl"
      className="border border-gray-300 rounded-md mx-auto w-full max-w-md"
    >
      <button
        type="button"
        className="flex items-center justify-between w-full p-4 bg-gray-100 text-black font-semibold text-sm hover:bg-gray-200"
        onClick={onToggle}
      >
        {buttonText}
        <svg
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4" style={{ maxHeight: "250px", overflowY: "auto" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={onSearchChange}
            className="block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="جستجو..."
          />
          <div className="space-y-2">
            {filteredItems.map((name, index) => (
              <div
                key={index}
                className="flex items-center p-2 rounded hover:bg-gray-100"
              >
                <input
                  id={`checkbox-item-${index}`}
                  type="checkbox"
                  checked={checkedItems[index]}
                  onChange={() => onCheckboxChange(index)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`checkbox-item-${index}`}
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  {name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
