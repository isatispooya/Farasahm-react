import React, { useState } from "react";
import ModalFilter from "../componet/modalFilter";

import SliderComponent from "../componet/slider";
import Date from "../componet/date";

const Marketing = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 z-50">
        {isModalOpen && <ModalFilter toggleModal={toggleModal} />}
        <div>
          <SliderComponent />
          <Date />
        </div>
      </div>
    </>
  );
};
export default Marketing;
