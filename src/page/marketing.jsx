import React, { useState } from "react";
import ModalFilter from "../componet/modalFilter";

import SliderComponent from "../componet/saham";
import Date from "../componet/date";

const Marketing = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {isModalOpen && <ModalFilter toggleModal={toggleModal} />}
        <div>
          <Date />
          <SliderComponent />
        </div>
      </div>
    </>
  );
};
export default Marketing;
