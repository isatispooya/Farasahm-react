import React, { useState } from "react";
import ModalFilter from "../componet/modalFilter";

// import SliderComponent from "../componet/slider";
// import Date from "../componet/date";

const Marketing = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div> 
        {isModalOpen && <ModalFilter toggleModal={toggleModal} />}
        <div>

        </div>
      </div>
    </>
  );
};
export default Marketing;
