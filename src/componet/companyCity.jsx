import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Accordion from "./accordion";
import { OnRun } from "../config/config";
import { AccessContext } from "../config/accessContext";

const CompanyCity = () => {
  const [companyList, setCompanyList] = useState([]);
  const [CityList, setCityList] = useState([]);
  const [companySelected, setCompanySelected] = useState();
  const [CitySelected, setCitySelected] = useState();

  const [citySearchQuery, setCitySearchQuery] = useState("");
  // const [companySearchQuery, setCompanySearchQuery] = useState("");
  const [openAccordion, setOpenAccordion] = useState(null);

  const access = useContext(AccessContext);
  console.log(access);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "POST",
          url: `${OnRun}/marketing/cityregisternobours`,
          headers: { "content-type": "application/json" },
          data: { access:access },
        };

        const response = await axios.request(options);
        setCityList(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); 
  }, [access]); 

  const handleAccordionToggle = (type) => {
    setOpenAccordion((prev) => (prev === type ? null : type));
  };

  // const handleCheckboxChange = (index, type) => {
  //   setAccordions((prevState) => ({
  //     ...prevState,
  //     [type]: {
  //       ...prevState[type],
  //       checkedItems: prevState[type].checkedItems.map((item, i) =>
  //         i === index ? !item : item
  //       ),
  //     },
  //   }));
  // };

  const handleCitySearchChange = (event) => {
    setCitySearchQuery(event.target.value);
  };

  // const handleCompanySearchChange = (event) => {
  //   setCompanySearchQuery(event.target.value);
  // };

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen p-4">
      <Accordion
        items={CityList}
        // checkedItems={accordions.city.checkedItems}
        // onCheckboxChange={(index) => handleCheckboxChange(index, "city")}
        searchQuery={citySearchQuery}
        onSearchChange={handleCitySearchChange}
        buttonText="انتخاب شهر"
        isOpen={openAccordion === "city"}
        onToggle={() => handleAccordionToggle("city")}
      />
      {/* <Accordion
        items={accordions.company.items}
        checkedItems={accordions.company.checkedItems}
        onCheckboxChange={(index) => handleCheckboxChange(index, "company")}
        searchQuery={companySearchQuery}
        onSearchChange={handleCompanySearchChange}
        buttonText="انتخاب شرکت ها"
        isOpen={openAccordion === "company"}
        onToggle={() => handleAccordionToggle("company")}
      /> */}
    </div>
  );
};

export default CompanyCity;
