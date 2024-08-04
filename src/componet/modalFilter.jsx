import React, { useState, useEffect } from "react";
import NationalIdSearch from "./nationalFilter";
import CompanyFilter from "./comanyFilter";
import CityFilter from "./cityFilter";
import Stocks from "./Stocks";
import Date from "./birthDate";
import PhoneSearch from "./phoneFilter";
import NameSearch from "./name";
import {
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  IconButton,
} from "@mui/material";
import CardConfigMarketing from "./CardConfigMarketing";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import axios from "axios";
import { OnRun } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Import the dropdown icon

const ModalFilter = ({ toggleModal, access }) => {
  const steps = ["لیست", "تنظیمات", "فیلتر"];
  const [configSelected, setConfigSelected] = useState(null);
  const [stepNumber, setStepNumber] = useState(0);
  const [config, setConfig] = useState({
    title:'',
    send_time: null,
    context: "",
    period: "ones",
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
  });
  const [listConfig, setListConfig] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const getConfigList = () => {
    axios({
      method: "POST",
      url: OnRun + "/marketing/marketinglist",
      data: { access: access },
    }).then((response) => {
      setListConfig(response.data);
    });
  };

  const nextStep = () => stepNumber < 2 && setStepNumber(stepNumber + 1);
  const backStep = () => stepNumber > 0 && setStepNumber(stepNumber - 1);

  const PostData = () => {
    axios({
      method: "POST",
      url: `${OnRun}/marketing/fillter`,
      headers: { "content-type": "application/json" },
      data: {
        access: access,
        config: config,
      },
    })
      .then(() => toast.success("Data submitted successfully!"))
      .catch(() => toast.error("An error occurred while submitting data!"));
  };

  const getConfig = () => {
    if (configSelected) {
      axios({
        method: "POST",
        url: `${OnRun}/marketing/perviewcontext`,
        data: { access: access, context: "", _id: configSelected },
      })
        .then((response) => {
          response.data.config['title'] = response.data['title']
          setConfig(response.data.config);
        })
        .catch((error) => {
          console.error("error:", error);
        });
    } else {
      setConfig({
        title: '',
        send_time: null,
        period: null,
        context: "",
        period: "ones",
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
      });
    }
    nextStep();
  };
console.log(config);

  useEffect(getConfig, [configSelected]);
  useEffect(getConfigList, []);

  const renderFilters = () => (
    <>
      <h2 className="text-xl mt-8 font-bold mb-6 text-center text-gray-800">
        سهامداران غیر بورسی
      </h2>
      <div className="overflow-y-auto max-h-[calc(80vh-180px)]">
        <div className="bg-white rounded-lg p-6 shadow-inner">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setFiltersOpen(!filtersOpen)} // Toggle dropdown state
            fullWidth
            endIcon={
              <ExpandMoreIcon
                style={{
                  transform: filtersOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              />
            }
          >
            تنظیمات فیلتر
          </Button>
          {filtersOpen && (
            <div className="mt-4">
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
      <div className="flex self-center justify-center w-full mt-6">
        <button
          onClick={PostData}
          className="bg-green-500 text-white px-8 py-1 rounded-md shadow-md hover:bg-green-700"
        >
          ایجاد
        </button>
      </div>
    </>
  );

  const sendingOptions = () => {
    console.log(config)
    return (
      <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-xl">
        <TextField
          id="outlined-basic"
          disabled
          label="عنوان" // This will be the label above the input field
          defaultValue={config.title} // Use defaultValue if it's static
          variant="outlined"
        />

        <FormControl fullWidth className="mt-4"></FormControl>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-right font-semibold mb-4">تاریخ و زمان ارسال</p>
          <div className="flex justify-center">
            <DatePicker
              format="MM/DD/YYYY HH:mm:ss"
              plugins={[<TimePicker position="bottom" />]}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              className="w-full p-4 text-lg rounded-lg border border-gray-300 shadow-sm"
            />
          </div>
        </div>

        <FormControl fullWidth style={{ marginTop: "40px" }}>
          <InputLabel id="frequency-select-label">
            انتخاب تعداد ارسال
          </InputLabel>
          <Select
            labelId="frequency-select-label"
            id="frequency-select"
            onChange={(e) => e.target.value}
            className="bg-white"
            value={config.period}
          >
            <MenuItem value="ones">یکبار</MenuItem>
            <MenuItem value="daily">روزانه</MenuItem>
            <MenuItem value="weekly">هفتگی</MenuItem>
            <MenuItem value="monthly">ماهانه</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };

  return (
    <div
      dir="rtl"
      className="relative w-full max-w-6xl max-h-screen rounded-xl p-6 overflow-y-auto"
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
        <>
          <CardConfigMarketing
            profil={"+"}
            title={"جدید"}
            id={null}
            setConfigSelected={setConfigSelected}
          />
          {listConfig.map((i) => (
            <CardConfigMarketing
              key={i._id}
              profil={"*"}
              title={i.title}
              id={i._id}
              setConfigSelected={setConfigSelected}
            />
          ))}
        </>
      )}

      {stepNumber === 1 && sendingOptions()}
      {stepNumber === 2 && renderFilters()}
      <div className="flex justify-between">
        <Button disabled={stepNumber === 0} onClick={backStep}>
          قبلی
        </Button>
        <Button disabled={stepNumber === 0} onClick={nextStep}>
          بعدی
        </Button>
      </div>
    </div>
  );
};

export default ModalFilter;
