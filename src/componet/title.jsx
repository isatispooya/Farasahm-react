import { useState } from 'react';
import { FaCheck, FaWindowClose } from 'react-icons/fa';

const Title = ({ listConfig, selectedItem, handleDeleteItem, handleOptionClick }) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeDropdown = () => setIsOpen(false);

  // اضافه کردن آیتم "جدید" به ابتدای لیست
  const updatedListConfig = ['جدید', ...listConfig];

  return (
    <div dir="rtl" className="space-y-2">
      <div className="text-sm text-gray-500">
        <span>آیتم انتخاب شده:</span>{' '}
        <span className="text-sm text-gray-900">{selectedItem || 'هیچ آیتمی انتخاب نشده'}</span>
      </div>

      <div className="relative">
        {isOpen && (
          <div className="absolute mt-2 w-[600px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <ul className="py-1">
              {updatedListConfig.map((item, index) => (
                <li
                  key={index}
                  className='px-4 py-2 hover:bg-slate-200 flex items-center justify-between cursor-pointer'
                  onClick={() => {
                    if (item === 'جدید') {
                      console.log('جدید');
                    } else {
                      console.log('آیتم');
                    }
                    handleOptionClick(item);
                    closeDropdown();
                  }}
                >
                  <span>{item}</span>
                  {item !== 'جدید' && (
                    <div className="flex space-x-8 gap-2">
                      <FaCheck
                        onClick={() => {
                          handleOptionClick(item);
                          closeDropdown();
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

