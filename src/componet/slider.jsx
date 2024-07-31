import React, { useState } from "react";

const SliderComponent = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");

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
      console.log("Input 1:", num1);
      console.log("Input 2:", num2);
      console.log("Input 3:", num3);
      console.log("Input 4:", num4);
    } else {
      alert("Please enter valid numbers in all fields.");
    }
  };

  return (
    <div
      dir="rtl"
      className="w-full mx-auto my-2 text-center p-2 bg-gray-100 rounded-lg"
    >
      <div className="text-center text-xl mb-2 font-bold w-full"> سهام</div>
      <div className="flex justify-between items-center mb-2 bg-gray-200 shadow-md p-2">
        <div className="text-right text-lg font-bold w-full"> تعداد سهام</div>

        <div className="flex justify-between space-x-2 w-full ">
          <div className="text-right w-1/4">
            <span className="text-sm block">از</span>
            <input
              type="text"
              value={input1}
              onChange={handleInput1Change}
              className="w-full p-2 text-center border border-gray-300 rounded shadow-md"
            />
          </div>
          <div className="text-right w-1/4">
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
        <div className="text-right text-lg font-bold w-full">
          مقدار درصد سهام
        </div>

        <div className="flex justify-between space-x-2 w-full">
          <div className="text-right w-1/4">
            <span className="text-sm block"> از</span>
            <input
              type="text"
              value={input3}
              onChange={handleInput3Change}
              className="w-full p-2 shadow-md text-center border border-gray-300 rounded"
            />
          </div>
          <div className="text-right w-1/4">
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

      {/* Button to set values */}
    </div>
  );
};

export default SliderComponent;
