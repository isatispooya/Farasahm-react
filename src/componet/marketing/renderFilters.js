import React, { useState, useRef, useEffect } from "react";
import { Button, ButtonGroup } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NationalIdSearch from "../nationalFilter";
import CityFilter from "../cityFilter";
import CompanyFilter from "../comanyFilter";
import BirthDate from "../birthDate";
import RemainingCustomer from "../remainingCustomer";
import PhoneSearch from "../phoneFilter";
import Stocks from "../Stocks";
import NameSearch from "../name.jsx";
import InsuranceConsultant from "../insuranceconsultant.jsx";
import NationalFilterBime from "../nationalFilterBime.jsx";
import NameFilterBime from "../nameFilterBime.jsx";
import MordBime from "../mordBime.jsx";
import PhoneFilterBime from "../phoneFilterBime.jsx";
import CompanyBime from "../companyBime.jsx";
import PaymentBime from "../payment&FeeBime.jsx";
import FieldBime from "../FieldBime.jsx";

const RenderFilters = ({ config = {}, setConfig, access }) => {
  const [selected, setSelected] = useState([]);
  const [openNobours, setOpenNobours] = useState(false);
  const [openInsuranceBroker, setOpenInsuranceBroker] = useState(false);
  const dropdownRef = useRef(null);
  const ButtonTitle = ["nobours", "insuranceBroker", "stockExchange"];

  useEffect(() => {
    const newSelected = [];
    if (config.nobours?.enabled) newSelected.push("nobours");
    if (config.insurance?.enabled) newSelected.push("insuranceBroker");
    if (config.stockExchange?.enabled) newSelected.push("stockExchange");
    setSelected(newSelected);
  }, [config]);

  const handleClick = (value) => {
    setSelected((prevSelected) => {
      const isSelected = prevSelected.includes(value);
      const updatedSelected = isSelected
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value];

      setConfig((prevConfig) => {
        const updatedConfig = {
          ...prevConfig,
          nobours:
            value === "nobours" ? { enabled: !isSelected } : prevConfig.nobours,
          insurance:
            value === "insuranceBroker"
              ? { enabled: !isSelected }
              : prevConfig.insurance,
          stockExchange:
            value === "stockExchange"
              ? { enabled: !isSelected }
              : prevConfig.stockExchange,
        };

        return updatedConfig;
      });

      return updatedSelected;
    });
  };

  const handleDropdownClick = (dropdownType) => {
    if (dropdownType === "nobours") {
      setOpenNobours(!openNobours);
      setOpenInsuranceBroker(false);
    } else if (dropdownType === "insuranceBroker") {
      setOpenInsuranceBroker(!openInsuranceBroker);
      setOpenNobours(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenNobours(false);
        setOpenInsuranceBroker(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="overflow-y-auto max-h-[calc(150vh-180px)]"
      ref={dropdownRef}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center space-y-4">
        <ButtonGroup variant="outlined" aria-label="Loading button group ">
          {ButtonTitle.map((buttonValue) => (
            <Button
              style={{ padding: "20px" }}
              key={buttonValue}
              variant={
                selected.includes(buttonValue) ? "contained" : "outlined"
              }
              onClick={() => handleClick(buttonValue)}
              disabled={buttonValue === "stockExchange"}
            >
              {buttonValue === "nobours"
                ? "غیر بورسی"
                : buttonValue === "insuranceBroker"
                ? "کارگزاری بیمه"
                : "کارگزاری بورس"}
            </Button>
          ))}
        </ButtonGroup>

        {config.nobours?.enabled && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDropdownClick("nobours")}
              fullWidth
              style={{ padding: "10px", margin: "10px" }}
              endIcon={
                <ExpandMoreIcon
                  style={{
                    transform: openNobours ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                />
              }
            >
              سهامداران غیر بورسی
            </Button>

            {openNobours && (
              <div className="mt-4 w-full">
                <NationalIdSearch config={config} setConfig={setConfig} />
                <NameSearch config={config} setConfig={setConfig} />
                <PhoneSearch config={config} setConfig={setConfig} />
                <CityFilter
                  access={access}
                  config={config}
                  setConfig={setConfig}
                />
                <CompanyFilter
                  access={access}
                  config={config}
                  setConfig={setConfig}
                />
                <Stocks config={config} setConfig={setConfig} />
                <BirthDate config={config} setConfig={setConfig} />
              </div>
            )}
          </>
        )}

        {config.insurance?.enabled && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDropdownClick("insuranceBroker")}
              fullWidth
              style={{ padding: "10px", margin: "10px" }}
              endIcon={
                <ExpandMoreIcon
                  style={{
                    transform: openInsuranceBroker
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                />
              }
            >
              کارگزاری بیمه
            </Button>

            {openInsuranceBroker && (
              <div className="mt-4 w-full">
                <NationalFilterBime
                  setConfig={setConfig}
                  config={config}
                  access={access}
                />
                <NameFilterBime
                  setConfig={setConfig}
                  config={config}
                  access={access}
                />
                <PhoneFilterBime setConfig={setConfig} config={config} />
                <RemainingCustomer setConfig={setConfig} config={config} />
                <InsuranceConsultant
                  setConfig={setConfig}
                  config={config}
                  access={access}
                />
                <MordBime
                  setConfig={setConfig}
                  config={config}
                  access={access}
                />
                <FieldBime setConfig={setConfig} config={config} />
                <PaymentBime setConfig={setConfig} config={config} />
                <CompanyBime
                  setConfig={setConfig}
                  config={config}
                  access={access}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RenderFilters;
