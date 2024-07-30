import React, { useState } from "react";
import Accordion from "./accordion";

const CompanyCity = () => {
  const [accordions, setAccordions] = useState({
    city: {
      checkedItems: Array(7).fill(false),
      items: ["یزد", "اصفهان", "تهران", "شیراز", "کرج", "گیلان", "خوزستان"],
    },
    company: {
      checkedItems: Array(7).fill(false),
      items: [
        "شرکت فلان",
        "شرکت بیصار",
        "شرکت تو یزد",
        "شرکت تو کرج",
        "شرکت تو اصفهان",
        "شرکت بینهایت",
        "شرکت تو همه شهرا",
      ],
    },
  });

  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [companySearchQuery, setCompanySearchQuery] = useState("");
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionToggle = (type) => {
    setOpenAccordion((prev) => (prev === type ? null : type));
  };

  const handleCheckboxChange = (index, type) => {
    setAccordions((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        checkedItems: prevState[type].checkedItems.map((item, i) =>
          i === index ? !item : item
        ),
      },
    }));
  };

  const handleCitySearchChange = (event) => {
    setCitySearchQuery(event.target.value);
  };

  const handleCompanySearchChange = (event) => {
    setCompanySearchQuery(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen p-4">
      <Accordion
        items={accordions.city.items}
        checkedItems={accordions.city.checkedItems}
        onCheckboxChange={(index) => handleCheckboxChange(index, "city")}
        searchQuery={citySearchQuery}
        onSearchChange={handleCitySearchChange}
        buttonText="انتخاب شهر"
        isOpen={openAccordion === "city"}
        onToggle={() => handleAccordionToggle("city")}
      />
      <Accordion
        items={accordions.company.items}
        checkedItems={accordions.company.checkedItems}
        onCheckboxChange={(index) => handleCheckboxChange(index, "company")}
        searchQuery={companySearchQuery}
        onSearchChange={handleCompanySearchChange}
        buttonText="انتخاب شرکت ها"
        isOpen={openAccordion === "company"}
        onToggle={() => handleAccordionToggle("company")}
      />
    </div>
  );
};

export default CompanyCity;
