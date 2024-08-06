import { Button, FormControlLabel, Switch } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NationalIdSearch from "../nationalFilter";
import CityFilter from "../cityFilter";
import CompanyFilter from "../comanyFilter";
import BirthDate from "../birthDate";
import RemainingCustomer from "../remainingCustomer";
import PhoneSearch from "../phoneFilter";



const RenderFilters = ({handleDropdownToggle, openDropdown, config, setConfig, access}) => (
    <>
      <div className="overflow-y-auto max-h-[calc(150vh-180px)]">
        <div className="bg-white rounded-lg p-6 shadow-inner">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDropdownToggle("nobours")}
            fullWidth
            endIcon={
              <ExpandMoreIcon
                style={{
                  transform:
                    openDropdown === "nobours"
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              />
            }
          >
            سهامداران غیر بورسی
          </Button>
          {openDropdown === "nobours" && (
            <div className="mt-4">
              {/* <FormControlLabel
                control={
                  <Switch
                    checked={config.nobours?.enabled || false}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        nobours: {
                          ...config.nobours,
                          enabled: e.target.checked,
                        },
                      })
                    }
                    name="noboursEnabled"
                    color="primary"
                  />
                }
                label="فعال"
              /> */}
              <NationalIdSearch config={config} setConfig={setConfig}  />
              {/* <NameSearch config={config} setConfig={setConfig} /> */}
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
              {/* <Stocks config={config} setConfig={setConfig} />   */}
              <BirthDate config={config} setConfig={setConfig} />
            </div>
          )}
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(80vh-180px)]">
        <div className="bg-white rounded-lg p-6 shadow-inner">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDropdownToggle("remainingCustomer")}
            fullWidth
            endIcon={
              <ExpandMoreIcon
                style={{
                  transform:
                    openDropdown === "remainingCustomer"
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              />
            }
          >
            کارگزاری بیمه
          </Button>
          {openDropdown === "remainingCustomer" && (
            <div className="mt-4">
              <FormControlLabel
                control={
                  <Switch
                    checked={config.insurance?.enabled || false}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        insurance: {
                          ...config.insurance,
                          enabled: e.target.checked,
                        },
                      })
                    }
                    name="insuranceEnabled"
                    color="primary"
                  />
                }
                label="فعال"
              />
              <RemainingCustomer setConfig={setConfig} config={config} />
            </div>
          )}
        </div>
      </div>
    </>
  );



  export default RenderFilters;