import React, { useState } from "react";
import Accordion from "./accordion";

const CompanyCity = () => {
  const cities = ["یزد", "اصفهان", "تهران", "شیراز", "کرج", "گیلان", "خوزستان"];
  const companies = [
    "شرکت فلان",
    "شرکت بیصار",
    "شرکت تو یزد",
    "شرکت تو کرج",
    "شرکت تو اصفهان",
    "شرکت بینهایت",
    "شرکت تو همه شهرا",
  ];

  const [cityState, setCityState] = useState({
    checkedItems: Array(cities.length).fill(false),
    searchQuery: "",
  });

  const [companyState, setCompanyState] = useState({
    checkedItems: Array(companies.length).fill(false),
    searchQuery: "",
  });

  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionToggle = (type) => {
    setOpenAccordion(prev => (prev === type ? null : type));
  };

  const handleCheckboxChange = (index, type) => {
    if (type === "city") {
      setCityState(prevState => ({
        ...prevState,
        checkedItems: prevState.checkedItems.map((item, i) =>
          i === index ? !item : item
        ),
      }));
    } else if (type === "company") {
      setCompanyState(prevState => ({
        ...prevState,
        checkedItems: prevState.checkedItems.map((item, i) =>
          i === index ? !item : item
        ),
      }));
    }
  };

  const handleSearchChange = (event, type) => {
    const value = event.target.value;
    if (type === "city") {
      setCityState(prevState => ({
        ...prevState,
        searchQuery: value,
      }));
    } else if (type === "company") {
      setCompanyState(prevState => ({
        ...prevState,
        searchQuery: value,
      }));
    }
  };

  return (
    <div className="flex flex-col gap-2">
    <div className="text-center text-xl mb-2 font-bold w-full mt-2"> انتخاب شهر و شرکت</div>
    <div className="mb-5">
    <Accordion
        items={cities}
        checkedItems={cityState.checkedItems}
        onCheckboxChange={(index) => handleCheckboxChange(index, "city")}
        searchQuery={cityState.searchQuery}
        onSearchChange={(e) => handleSearchChange(e, "city")}
        buttonText="انتخاب شهر تولد"
        isOpen={openAccordion === "city"}
        onToggle={() => handleAccordionToggle("city")}
      />
      <Accordion
        items={companies}
        checkedItems={companyState.checkedItems}
        onCheckboxChange={(index) => handleCheckboxChange(index, "company")}
        searchQuery={companyState.searchQuery}
        onSearchChange={(e) => handleSearchChange(e, "company")}
        buttonText="انتخاب شرکت ها"
        isOpen={openAccordion === "company"}
        onToggle={() => handleAccordionToggle("company")}
        
      />

    </div>

    </div>
  );
};

export default CompanyCity;


