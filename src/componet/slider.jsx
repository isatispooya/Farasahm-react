import React, { useEffect, useState } from "react";

const SliderComponent = ({nobours,setNobours}) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInput1Change = (e) => {
    setInput1(e.target.value);
  };

  const handleInput2Change = (e) => {
    setInput2(e.target.value);
  };

  const handleInput3Change = (e) => {
    setInput3(e.target.value);
  };

  const handleInput4Change = (e) => {
    setInput4(e.target.value);
  };

  const handleSetValues = () => {
    const num1 = parseInt(input1);
    const num2 = parseInt(input2);
    const num3 = parseInt(input3);
    const num4 = parseInt(input4);

    if (!isNaN(num1) && !isNaN(num2) && !isNaN(num3) && !isNaN(num4)) {
      // console.log("Input 1:", num1);
      // console.log("Input 2:", num2);
      // console.log("Input 3:", num3);
      // console.log("Input 4:", num4);
    } else {
      alert("Please enter valid numbers in all fields.");
    }
  };

  useEffect(()=>{
    setNobours({...nobours,amount:{from:input1,to:input2}})
  },[input1,input2])

  useEffect(()=>{
    setNobours({...nobours,rate:{min:input3,max:input4}})
  },[input3,input4])
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      dir="rtl"
      className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg"
    >
      <button
        onClick={toggleDropdown}
        className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
      >
        سهام
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
        <div className="mt-2 bg-gray-200 p-4 rounded-lg ">
          <div className="flex justify-between items-center mb-2 bg-gray-200  p-2">
            <div className="text-right text-lg font-bold w-full"> تعداد سهام</div>

            <div className="flex justify-between space-x-4 w-full">
              <div className="text-right w-1/2">
                <span className="text-sm block">از</span>
                <input
                  type="text"
                  value={input1}
                  onChange={handleInput1Change}
                  className="w-full p-2 text-center border border-gray-300 rounded shadow-md"
                />
              </div>
              <div className="text-right w-1/2">
                <span className="text-sm block">تا</span>
                <input
                  type="text"
                  value={input2}
                  onChange={handleInput2Change}
                  className="w-full p-2 text-center border border-gray-300 rounded shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-5 bg-gray-200 shadow-md p-2">
            <div className="text-right text-lg font-bold w-full">درصد سهام</div>

            <div className="flex justify-between space-x-4 w-full">
              <div className="text-right w-1/2">
                <span className="text-sm block"> از</span>
                <input
                  type="text"
                  value={input3}
                  onChange={handleInput3Change}
                  className="w-full p-2 shadow-md text-center border border-gray-300 rounded"
                />
              </div>
              <div className="text-right w-1/2">
                <span className="text-sm block"> تا</span>
                <input
                  type="text"
                  value={input4}
                  onChange={handleInput4Change}
                  className="w-full p-2 shadow-md text-center border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderComponent;

