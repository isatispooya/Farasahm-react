import React, { useState } from 'react';

const NationalIdSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ids, setIds] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAdd = () => {
    if (searchTerm && !ids.includes(searchTerm)) {
      setIds([...ids, searchTerm]);
      setSearchTerm(''); // Clear the search input after adding
    }
  };

  const handleRemove = (id) => {
    setIds(ids.filter((existingId) => existingId !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div dir='rtl' className="p-1 max-w-3xl mx-auto bg-gray-100 shadow-md rounded-lg">
      <div className="mb-2 mt-2 flex items-center space-x-4">
        <input
          type="text"
          placeholder="جستجو کد ملی"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}  
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
        >
          افزودن
        </button>
      </div>

      {ids.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">کدملی</h3>
          <div className="flex flex-wrap gap-4">
            {ids.map((id) => (
              <div
                key={id}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="mr-2 text-lg font-medium">{id}</span>
                <button
                  onClick={() => handleRemove(id)}
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NationalIdSearch;





