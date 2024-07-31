import React, { useState } from 'react';

const SliderComponent = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleInput1Change = (e) => {
    setInput1(e.target.value);
  };

  const handleInput2Change = (e) => {
    setInput2(e.target.value);
  };

  const handleSetValues = () => {
    // Convert input values to numbers
    const num1 = parseInt(input1);
    const num2 = parseInt(input2);
    
    // Check if both inputs are valid numbers
    if (!isNaN(num1) && !isNaN(num2)) {
      // Example logic: You can perform any action you want with num1 and num2
      console.log("Input 1:", num1);
      console.log("Input 2:", num2);
    } else {
      // Handle invalid inputs (e.g., show an error message)
      alert('Please enter valid numbers in both fields.');
    }
  };

  return (
    <div className="w-72 mx-auto my-5 text-center p-4 bg-gray-100 rounded-lg">
      <div className="mb-2 text-lg font-bold">محدوده تعداد سهام</div>

      {/* First input */}
      <div className="mb-4">
        <div className="text-right">
          <span className="text-sm">از</span>
        </div>
        <input
          type="text"
          value={input1}
          onChange={handleInput1Change}
          className="w-full p-2 text-center border border-gray-300 rounded"
        />
      </div>

      {/* Second input */}
      <div className="mb-5">
        <div className="text-right">
          <span className="text-sm">تا</span>
        </div>
        <input
          type="text"
          value={input2}
          onChange={handleInput2Change}
          className="w-full p-2 text-center border border-gray-300 rounded"
        />
      </div>

      {/* Button to set values */}
      <button
        onClick={handleSetValues}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        ثبت
      </button>
    </div>
  );
};

export default SliderComponent;
