import React, { useState } from "react";
import ModalFilter from "../componet/modalFilter";
import CompanyCity from "./companyCity";

const Marketing = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {isModalOpen && <ModalFilter toggleModal={toggleModal} />}
        <CompanyCity />
      </div>

      <div className="bg-red-700"></div>
    </>
  );
};
export default Marketing;
