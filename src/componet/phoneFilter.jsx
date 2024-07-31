import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const PhoneSearch = () => {
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [phones1, setPhones1] = useState([]);
  const [phones2, setPhones2] = useState([]);

  const handleSearch1 = (e) => {
    const value = e.target.value;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setSearchTerm1(value);
    }
  };

  const handleSearch2 = (e) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setSearchTerm2(value);
    }
  };

  const handleAdd1 = () => {
    if (searchTerm1 && !phones1.includes(searchTerm1)) {
      setPhones1([...phones1, searchTerm1]);
      setSearchTerm1("");
    }
  };

  const handleAdd2 = () => {
    if (searchTerm2 && !phones2.includes(searchTerm2)) {
      setPhones2([...phones2, searchTerm2]);
      setSearchTerm2("");
    }
  };

  const handleRemove1 = (id) => {
    setPhones1(phones1.filter((existingId) => existingId !== id));
  };

  const handleRemove2 = (id) => {
    setPhones2(phones2.filter((existingId) => existingId !== id));
  };

  const handleKeyDown1 = (e) => {
    if (e.key === "Enter") {
      handleAdd1();
    }
  };

  const handleKeyDown2 = (e) => {
    if (e.key === "Enter") {
      handleAdd2();
    }
  };

  return (
    <div
      dir="rtl"
      className="p-1 max-w-3xl mx-auto bg-gray-100 shadow-md rounded-lg"
    >
      <div className="text-center text-xl mb-2 font-bold w-full">
        شماره تماس
      </div>

      <div className="mb-2 mt-2 flex items-center space-x-4 space-x-reverse">
        <input
          type="text"
          placeholder="پیش شماره همراه"
          value={searchTerm1}
          onChange={handleSearch1}
          onKeyDown={handleKeyDown1}
          className="w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          onClick={handleAdd1}
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
        >
          افزودن
        </button>
      </div>

      {phones1.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            پیش شماره
          </h3>
          <div className="flex flex-wrap gap-4">
            {phones1.map((id) => (
              <div
                key={id} 
                className="flex items-center  px-2 py-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <button
                  onClick={() => handleRemove1(id)}
                  className=" text-white bg-red-600 rounded-full p-1 transition duration-300 focus:outline-none shadow-md hover:shadow-lg"
                >
                  <IoCloseOutline className="text-2xl  text-white " />
                </button>
                <span className="mr-2 text-lg font-medium">{id}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-2 mt-2 flex items-center space-x-4 space-x-reverse">
        <input
          type="text"
          placeholder="سه رقم میانه شماره همراه"
          value={searchTerm2}
          onChange={handleSearch2}
          onKeyDown={handleKeyDown2}
          className="w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          onClick={handleAdd2}
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
        >
          افزودن
        </button>
      </div>

      {phones2.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-4">
            {phones2.map((id) => (
              <div
                key={id}
                className="flex items-center px-2 py-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <button
                  onClick={() => handleRemove2(id)}
                  className=" text-white  bg-red-600  rounded-full p-1 transition duration-300 focus:outline-none shadow-md hover:shadow-lg"
                >
                  <IoCloseOutline className="text-2xl text-white " />
                </button>
                <span className="mr-1 text-lg font-medium">{id}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneSearch;