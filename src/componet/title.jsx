import { useState } from 'react';
import { FaCheck, FaWindowClose, FaPlus } from 'react-icons/fa';

const Title = ({ listConfig, selectedItem, handleDeleteItem, handleOptionClick }) => {
  const updatedListConfig = ['جدید', ...listConfig];


  return (
    <div dir="rtl" className="space-y-4 p-4">
      {updatedListConfig.map((item, index) => (
        <div
          key={index}
          className={`rounded-lg p-4 cursor-pointer shadow-md ${
            item === selectedItem ? 'bg-blue-100' : 'bg-white'
          }`}
          onClick={() => handleOptionClick(item)}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              {item === 'جدید' ? (
                <span className="flex items-center">
                  <FaPlus className="ml-2 text-blue-500" />
                  {item}
                </span>
              ) : (
                item
              )}
            </h2>
            {item !== 'جدید' && (
              <div className="flex space-x-2 gap-2">
                <FaCheck
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionClick(item);
                  }}
                  className="text-green-500 hover:text-green-700 cursor-pointer"
                />
                <FaWindowClose
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteItem(item);
                  }}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                />
              </div>
            )}
          </div>
       
        </div>
      ))}
    </div>
  );
};

export default Title;


