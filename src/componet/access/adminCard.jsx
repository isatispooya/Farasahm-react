import React, { useState } from "react";
 // Import the TabulatorTable component

const AdminCard = () => {

  const access = "your-access-token"; // Replace with your actual access token or prop

  const handleManageClick = (e) => {
    e.preventDefault();
   
  };



  return (
    <>
      <div className="w-80 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex flex-col items-center pb-10">
          <div className="flex justify-center items-center w-36 h-36 rounded-full overflow-hidden mb-4">
            <div className="relative w-full h-full overflow-hidden bg-gray-100 rounded-full">
              <svg
                className="absolute w-full h-full text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <h5 className="mb-1 text-xl font-medium text-black">
            سهامدراران
          </h5>
          <span className="text-sm text-gray-500">دسترسی</span>
          <div className="flex mt-4 md:mt-6">
            <a
              href="/sendsms"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              ارسال پیام
            </a>
            <a
              href="#"
              className="py-2 px-4 ms-2 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              onClick={handleManageClick}
            >
              مدیریت
            </a>
          </div>
        </div>
      </div>

    </>
  );
};

export default AdminCard;


