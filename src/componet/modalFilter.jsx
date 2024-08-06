
import React, { useState, useEffect } from "react";
import NationalIdSearch from "./nationalFilter";
import CompanyFilter from "./comanyFilter";
import CityFilter from "./cityFilter";
import Stocks from "./Stocks";
import Date from "./birthDate";
import PhoneSearch from "./phoneFilter";
import NameSearch from "./name";
import { DateObject } from "react-multi-date-picker";
import SendingOptions from "./marketingCom/sendingOptions";
import RenderFilters from "./marketingCom/renderFilters";
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
  toggleModal,
  access,
  configSelected,
  setConfigSelected,
}) => {
  const newconfig = {
    config: {
      send_time: null,
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
    axios({
      method: "POST",
      url: OnRun + "/marketing/marketinglist",
      data: { access: access },
    })
      .then((response) => {
        setListConfig(response.data);
      })
      .catch((error) => {
        toast.error("خطا در دریافت لیست تنظیمات");
        console.error("Error fetching config list:", error);
      });
  };

  const nextStep = () => stepNumber < 2 && setStepNumber(stepNumber + 1);
  const backStep = () => stepNumber > 0 && setStepNumber(stepNumber - 1);

  const PostData = () => {
    const url = configSelected
      ? `${OnRun}/marketing/editfillter`
      : `${OnRun}/marketing/fillter`;

    const data = configSelected
      ? { access: access, _id: configSelected, title: config.title, config: config }
      : { access: access, title: config.title, config: config };

    axios({
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: data,
    })
      .then((response) => {
        if (response.data.reply === true) {
          toast.success("با موفقیت ایجاد شد");
          toggleModal(false);
        } else {
          toast.warn(response.data.msg);
        }
      })
      .catch((error) => {
        toast.error("خطا در دریافت از سرور");
        console.error("Error posting data:", error);
      });
  };

  const getConfig = () => {
    if (configSelected) {
      axios({
        method: "POST",
        url: `${OnRun}/marketing/perviewcontext`,
        data: { access: access, context: "", _id: configSelected },
      })
        .then((response) => {
          setConfig(response.data.config);
        })
        .catch((error) => {
          toast.error("خطا در دریافت تنظیمات");
          console.error("Error fetching config:", error);
        });
    } else {
      setConfig(newconfig);
    }
  };

  useEffect(getConfig, [configSelected]);
  useEffect(getConfigList, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleDropdownToggle = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const renderFilters = () => (
    <>
      <div className="overflow-y-auto max-h-[calc(80vh-180px)]">
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
          {openDropdown === "nobours" && config.nobours && (
            <div className="mt-4">
              <FormControlLabel
                control={
                  <Switch
                    checked={config.nobours.enabled || false} // بررسی وجود و مقداردهی پیش‌فرض
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
  
              {/* <NationalIdSearch config={config} setConfig={setConfig} /> */}
              {/* <NameSearch config={config} setConfig={setConfig} /> */}
              <PhoneSearch config={config} setConfig={setConfig} />
              {/* <CityFilter access={access} config={config} setConfig={setConfig} /> */}
              {/* <CompanyFilter
                access={access}
                config={config}
                setConfig={setConfig}
              /> */}
              <Stocks config={config} setConfig={setConfig} />
              {/* <Date config={config} setConfig={setConfig} /> */}
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
          {openDropdown === "remainingCustomer" && config.insurance && (
            <div className="mt-4">
              <FormControlLabel
                control={
                  <Switch
                    checked={config.insurance.enabled || false} // بررسی وجود و مقداردهی پیش‌فرض
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
            <div className="mt-8">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={56}
                className="rounded-lg"
              />
            </div>
            <div className="mt-8 p-4">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={100}
                className="rounded-lg"
              />
            </div>
            <div className="mt-8">
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
                value={config.title || ""}
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
            value={config.period || ""}
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
      onClick={stepNumber === 2 ? PostData : nextStep}
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
