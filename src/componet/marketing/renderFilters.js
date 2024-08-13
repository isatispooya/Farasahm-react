import React, { useState, useRef } from "react";
import { Button, ButtonGroup } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NationalIdSearch from "./nobours/nationalFilter.jsx";
import CityFilter from "./nobours/cityFilter";
import CompanyFilter from "./nobours/comanyFilter";
import BirthDate from "./nobours/birthDate.jsx";
import RemainingCustomer from "./remainingCustomer.jsx";
import PhoneSearch from "./nobours/phoneFilter.jsx";
import Stocks from "./nobours/Stocks.jsx";
import NameSearch from "./nobours/name.jsx";
import InsuranceConsultant from "./bime/insuranceconsultant.jsx";
import NationalFilterBime from "./bime/nationalFilterBime.jsx";
import NameFilterBime from "./bime/nameFilterBime.jsx";
import MordBime from "./bime/mordBime.jsx";
import PhoneFilterBime from "./bime/phoneFilterBime.jsx";
import CompanyBime from "./bime/companyBime.jsx";
import PaymentBime from "./bime/payment&FeeBime.jsx";
import FieldBime from "./bime/FieldBime.jsx";
import BalanceBours from "./bours/Balancebours.jsx";
import MeqdarDaraei from "./bours/MeqdardaraeiBours.jsx";
import Latestdeals from "./bours/Latestdealsbours.jsx";
import BranchBors from "./bours/branchBors.jsx";
import NameBors from "./bours/nameBors.jsx";
import NationalFilterBors from "./bours/nationalFilterBors.jsx";
import PhoneFilterBors from "./bours/phoneFilterBors.jsx";
import CityFilterBors from "./bours/cityFilterBors.jsx";
import DateBirthBors from "./bours/dateBors.jsx";
import GenderBors from "./bours/genderBors.jsx";
import AssetBors from "./bours/assetBors.jsx";

const RenderFilters = ({ config, setConfig, access }) => {
  const [openNobours, setOpenNobours] = useState(false);
  const [openInsuranceBroker, setOpenInsuranceBroker] = useState(false);
  const [openBours, setOpenBours] = useState(false);
  const dropdownRef = useRef(null);

  const handleEnabledNobours = () => {
    let nobours = {
      ...config.nobours,
      enabled: !config.nobours.enabled,
    };
    setConfig({ ...config, nobours });
  };

  const handleEnabledInsurance = () => {
    let insurance = {
      ...config.insurance,
      enabled: !config.insurance.enabled,
    };
    setConfig({ ...config, insurance });
  };

  const handleEnabledStoBours = () => {
    let bours = {
      ...config.bours,
      enabled: !config.bours.enabled,
    };
    setConfig({ ...config, bours });
  };

  const handleDropdownClick = (dropdownType) => {
    if (dropdownType === "nobours") {
      setOpenNobours(!openNobours);
      setOpenInsuranceBroker(false);
      setOpenBours(false);
    } else if (dropdownType === "insuranceBroker") {
      setOpenInsuranceBroker(!openInsuranceBroker);
      setOpenNobours(false);
      setOpenBours(false);
    } else if (dropdownType === "bours") {
      setOpenBours(!openBours);
      setOpenNobours(false);
      setOpenInsuranceBroker(false);
    }
  };

  return (
    <div
      className="overflow-y-auto mt-8 max-h-[calc(180vh-200px)]"
      ref={dropdownRef}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center space-y-4">
        <ButtonGroup variant="outlined" aria-label="Loading button group">
          <Button
            style={{ padding: "20px" }}
            variant={config.nobours.enabled ? "contained" : "outlined"}
            onClick={handleEnabledNobours}
          >
            غیر بورسی
          </Button>
          <Button
            style={{ padding: "20px" }}
            variant={config.insurance.enabled ? "contained" : "outlined"}
            onClick={handleEnabledInsurance}
          >
            کارگزاری بیمه
          </Button>
          <Button
            style={{ padding: "20px" }}
            variant={config.bours.enabled ? "contained" : "outlined"}
            onClick={handleEnabledStoBours}
          >
            کارگزاری بورس
          </Button>
        </ButtonGroup>

        {config.nobours.enabled && (
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

        {config.insurance.enabled && (
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
                <FieldBime access={access} setConfig={setConfig} config={config} />
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

        {config.bours.enabled && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDropdownClick("bours")}
              fullWidth
              style={{ padding: "10px", margin: "10px" }}
              endIcon={
                <ExpandMoreIcon
                  style={{
                    transform: openBours ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                />
              }
            >
              کارگزاری بورس
            </Button>

            {openBours && (
              <div className="mt-4 w-full">
                <NationalFilterBors config={config} setConfig={setConfig} />
                <PhoneFilterBors setConfig={setConfig} config={config} />
                <NameBors config={config} setConfig={setConfig} />
                <GenderBors config={config} setConfig={setConfig} />
                <BranchBors config={config} setConfig={setConfig} access={access} />
                <AssetBors setConfig={setConfig} config={config} access={access} />
                <CityFilterBors setConfig={setConfig} config={config} access={access} />
                <BalanceBours config={config} setConfig={setConfig} />
                <Latestdeals config={config} setConfig={setConfig} />
                <DateBirthBors config={config} setConfig={setConfig} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RenderFilters;
