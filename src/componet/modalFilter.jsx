import React, { useState, useEffect } from "react";
import NationalIdSearch from "./nationalFilter";
import CompanyFilter from "./comanyFilter";
import CityFilter from "./cityFilter";
import Stocks from "./Stocks";
import Date from "./birthDate";
import PhoneSearch from "./phoneFilter";
import NameSearch from "./name";
import { DateObject } from "react-multi-date-picker";
import {
  Button,
  Skeleton,
  Step,
  StepLabel,
  Stepper,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";
import CardConfigMarketing from "./CardConfigMarketing";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import InputIcon from "react-multi-date-picker/components/input_icon";
import axios from "axios";
import { OnRun } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemainingCustomer from "./remainingCustomer";
import { GoPlus } from "react-icons/go";

const ModalFilter = ({
  access,
  configSelected,
  setConfigSelected,
  setIsContextSelected,
  setIsOpenFilter,
}) => {
  const newconfig = {
    config: {
      send_time: new DateObject(),
      context: null,
      period: null,
      insurance: {
        enabled: true,
        accounting: {
          from: "",
          to: "",
          code: "",
        },
      },
      nobours: {
        enabled: true,
        name: null,
        birthday: {
          from: null,
          to: null,
        },
        city: [],
        symbol: [],
        national_id: [],
        amount: {
          from: null,
          to: null,
        },
        rate: {
          min: null,
          max: null,
        },
        mobile: {
          num1: [],
          num2: [],
        },
      },
    },
    title: "",
  };

  const steps = ["لیست", "تنظیمات", "فیلتر"];
  const [stepNumber, setStepNumber] = useState(0);
  const [config, setConfig] = useState(newconfig);
  const [listConfig, setListConfig] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(true);

  const getConfigList = () => {
    axios
      .post(OnRun + "/marketing/marketinglist", { access: access })
      .then((response) => {
        setListConfig(response.data || []);
      });
  };

  const nextStep = () => stepNumber < 2 && setStepNumber(stepNumber + 1);
  const backStep = () => stepNumber > 0 && setStepNumber(stepNumber - 1);

  const PostData = () => {
    const postConfig =
      configSelected == null || configSelected === undefined
        ? axios.post(`${OnRun}/marketing/fillter`, {
            access: access,
            title: config.title,
            config: { ...config.config, period: config.period },
          })
        : axios.post(`${OnRun}/marketing/editfillter`, {
            access: access,
            _id: configSelected,
            title: config.title,
            config: { ...config.config, period: config.period },
          });

    postConfig
      .then((response) => {
        if (response.data.reply === true) {
          setIsOpenFilter(false);
          if (configSelected == null) setConfigSelected(response.data.id);
          console.log(response.data);
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch((error) => toast.error(error.message));
  };

  const getConfig = () => {
    if (configSelected) {
      axios
        .post(`${OnRun}/marketing/perviewcontext`, {
          access: access,
          context: "",
          _id: configSelected,
        })
        .then((response) => {
          if (response.data && response.data.config) {
            response.data.config["title"] = response.data["title"];
            setConfig(response.data.config);
          } else {
            console.error("Config data is missing or invalid");
          }
        })
        .catch((error) => {
          console.error("error:", error);
        });
    } else {
      setConfig(newconfig);
    }
  };

  useEffect(getConfig, [configSelected]);
  useEffect(getConfigList, []);
  useEffect(() => {
    setIsContextSelected(config.context);
  }, [config.context]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleDropdownToggle = (dropdownId) => {
    setOpenDropdown((prevDropdownId) =>
      prevDropdownId === dropdownId ? null : dropdownId
    );
  };

  const renderFilters = () => (
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
              <FormControlLabel
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
              />
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
              <Date config={config} setConfig={setConfig} />
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

  const sendingOptions = () => {
    return (
      <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-xl">
        {loading ? (
          <>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={56}
              className="rounded-lg"
            />
            <div className="mt-8 ">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={56}
                className="rounded-lg"
              />
            </div>
            <div className="mt-8 p-4 ">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={100}
                className="rounded-lg"
              />
            </div>
            <div className="mt-8 ">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={56}
                className="rounded-lg"
              />
            </div>
          </>
        ) : (
          <>
            <FormControl fullWidth className="mt-4">
              <TextField
                id="outlined-basic"
                label="عنوان"
                value={config.title || ""} // Ensure `config.title` is a string or empty string
                onChange={(e) =>
                  setConfig({ ...config, title: e.target.value })
                }
                variant="outlined"
              />
            </FormControl>
            <div className="mt-8 p-4 bg-blue-100 rounded-lg ">
              <p className="text-right font-semibold mb-4">
                تاریخ و زمان ارسال
              </p>
              <div className="flex justify-center">
                <DatePicker
                  value={
                    new DateObject({
                      date: config.send_time * 1,
                      calendar: persian,
                    })
                  }
                  plugins={[<TimePicker position="bottom" />]}
                  render={<InputIcon />}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="left"
                  className="w-full z-50 p-4 text-lg rounded-lg border border-gray-300 shadow-sm"
                />
              </div>
            </div>
            <FormControl fullWidth style={{ marginTop: "40px" }}>
              <InputLabel id="demo-simple-select-label">
                انتخاب تعداد ارسال
              </InputLabel>
              <Select
                style={{ backgroundColor: "white" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={config.period || ""} // Ensure `config.period` is a valid value
                label="انتخاب تعداد ارسال"
                onChange={(e) =>
                  setConfig({ ...config, period: e.target.value })
                }
              >
                <MenuItem value="ones">یکبار</MenuItem>
                <MenuItem value="daily">روزانه</MenuItem>
                <MenuItem value="weekly">هفتگی</MenuItem>
                <MenuItem value="monthly">ماهانه</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
      </div>
    );
  };

  return (
    <div
      dir="rtl"
      className="relative w-full min-h-screen bg-gray-100 p-6 overflow-hidden"
    >
      <ToastContainer />
      <Stepper activeStep={stepNumber}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {stepNumber === 0 && (
        <Grid container spacing={3}>
          <CardConfigMarketing
            profil={<GoPlus size={30} style={{ strokeWidth: 2 }} />}
            title={"جدید"}
            id={null}
            setConfigSelected={setConfigSelected}
            nextStep={nextStep}
          />
          {listConfig.map((i) => {
            const firstLetter = i.title.charAt(0);
            return (
              <CardConfigMarketing
                key={i._id}
                profil={<span>{firstLetter}</span>}
                title={i.title}
                id={i._id}
                data={i.date}
                status={i.status}
                setConfigSelected={setConfigSelected}
                nextStep={nextStep}
              />
            );
          })}
        </Grid>
      )}

      {stepNumber === 1 && sendingOptions()}
      {stepNumber === 2 && renderFilters()}

      <div className="flex justify-between mt-4">
        <Button
          disabled={stepNumber === 0}
          onClick={backStep}
          variant="contained"
          color="primary"
        >
          قبلی
        </Button>
        <Button
          disabled={stepNumber === 0}
          onClick={stepNumber === 2 ? () => PostData() : nextStep}
          variant="contained"
          color="primary"
        >
          {stepNumber === 2 ? "ایجاد" : "بعدی"}
        </Button>
      </div>
    </div>
  );
};

export default ModalFilter;
