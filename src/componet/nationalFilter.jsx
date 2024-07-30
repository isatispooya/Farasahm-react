import React, { useState } from 'react';

const nationalIds = Array.from({ length: 2000 }, (_, i) => (i + 1).toString().padStart(9, '0'));

const NationalIdSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [chosenIds, setChosenIds] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChoose = (id) => {
    if (!chosenIds.includes(id)) {
      setChosenIds([...chosenIds, id]);
    }
  };

  const handleRemove = (id) => {
    setChosenIds(chosenIds.filter((chosenId) => chosenId !== id));
  };

  const filteredIds = nationalIds.filter((id) =>
    id.includes(searchTerm)
  );

  return (
    <div dir='rtl' className="p-4 max-w-3xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="جستجو کد ملی"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {searchTerm && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">کدملی</h3>
          <div className="max-h-96 overflow-y-auto border p-2 rounded">
            <ul className="space-y-2">
              {filteredIds.map((id) => (
                <li key={id} className="flex justify-between items-center p-2 border-b">
                  <span>{id}</span>
                  <button
                    onClick={() => handleChoose(id)}
                    className="ml-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    انتخاب
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {searchTerm && chosenIds.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">انتخاب شده ها</h3>
          <div className="max-h-96 overflow-y-auto border p-2 rounded">
            <ul className="space-y-2">
              {chosenIds.map((id) => (
                <li key={id} className="flex justify-between items-center p-2 border-b">
                  <span>{id}</span>
                  <button
                    onClick={() => handleRemove(id)}
                    className="ml-2 p-1 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    حذف
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NationalIdSearch;



