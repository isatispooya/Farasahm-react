import React, { useState } from "react";

const LargeLoader = () => {
  return (
    <>
      <div class="flex justify-center items-center h-screen">
        <div class="flex flex-row items-center gap-2 w-32 h-32 mr-5">
          <div class="w-32 h-20 rounded-full bg-blue-700 animate-bounce "></div>
          <div class="w-32 h-20 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
          <div class="w-32 h-20 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
        <h1 className="text-4xl text-gray-400 ">لطفا شکیبا باشید</h1>
      </div>
    </>
  );
};

export default LargeLoader;
