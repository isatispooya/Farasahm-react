import React, { useState } from 'react';
import Slider from 'react-slider';

const SliderComponent = () => {
  const [value, setValue] = useState(0);

  const handleSliderChange = (value) => {
    setValue(value);
  };

  return (
    <div className="w-72 mx-auto my-5 text-center">
      <div className=" mb-2 text-lg font-bold">محدوده تعداد سهام</div>
      <div className="flex justify-center mb-5">
        <div className="relative">
          <input
            type="text"
            value={`${value}%`}
            readOnly
            className="w-24 p-2 text-center border border-gray-300 rounded"
          />
        </div>
      </div>
      <Slider
        className="w-full h-2 "
        thumbClassName="h-3 w-3  bg-blue-500 rounded-full  cursor-pointer"
        value={value}
        onChange={handleSliderChange}
        min={0}
     
        renderTrack={(props, state) => (
          <div
            {...props}
            className={`${
              state.index === 0 ? 'bg-blue-500' : 'bg-gray-300'
            } h-2 rounded-full`}
            style={{
              ...props.style,
              left: state.index === 0 ? '0%' : `${value}%`,
              width: state.index === 0 ? `${value}%` : `${100 - value}%`,
            }}
          />
        )}
        renderThumb={(props) => (
          <div {...props} className="h-3 w-3  z-10 bg-blue-500  rounded-full cursor-pointer" />
        )}
      />
    </div>
  );
};

export default SliderComponent;

