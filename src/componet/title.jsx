import { useState } from 'react';
import { FaCheck, FaWindowClose } from 'react-icons/fa';

const Title = ({ listConfig , selectedItem, handleDeleteItem, handleOptionClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div dir="rtl" className="space-y-2">
      <div className="text-sm text-gray-500">
        <span>آیتم انتخاب شده:</span>{' '}
        <span className="text-sm text-gray-900">{selectedItem || 'هیچ آیتمی انتخاب نشده'}</span>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          انتخاب آیتم
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <ul className="py-1">
              {listConfig.map((item, index) => (
                <li
                  key={index}
                  className='px-4 py-2 hover:bg-slate-200 flex items-center justify-between cursor-pointer '
                >
                  <span
                    onClick={() => {
                      handleOptionClick(item);
                      closeDropdown();
                    }}
                  >
                    {item}
                  </span>
                  <div className="flex space-x-8 gap-2">
                    <FaCheck
                      onClick={() => {
                        handleOptionClick(item);
                        closeDropdown();
                      }}
                      className="text-green-500 hover:text-green-700 cursor-pointer"
                    />
                    <FaWindowClose
                      onClick={() => handleDeleteItem(item)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Title;

