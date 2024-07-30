import React, { useState } from "react";
import Accordion from "./accordion";

const Marketing = () => {
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
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen p-4">
      <Accordion
        items={accordions.city.items}
        checkedItems={accordions.city.checkedItems}
        onCheckboxChange={(index) => handleCheckboxChange(index, "city")}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        buttonText="انتخاب شهر"
        isOpen={openAccordion === "city"}
        onToggle={() => handleAccordionToggle("city")}
      />
      <Accordion
        items={accordions.company.items}
        checkedItems={accordions.company.checkedItems}
        onCheckboxChange={(index) => handleCheckboxChange(index, "company")}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        buttonText="انتخاب شرکت ها"
        isOpen={openAccordion === "company"}
        onToggle={() => handleAccordionToggle("company")}
      />
    </div>
  );
};

export default Marketing;
