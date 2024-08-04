import React, { useState } from "react";
import NationalIdSearch from "./nationalFilter";
import CompanyFilter from "./comanyFilter";
import CityFilter from "./cityFilter";
import Stocks from "./Stocks";
import Date from "./birthDate";
import PhoneSearch from "./phoneFilter";
import NameSearch from "./name";
import axios from "axios";
import { OnRun } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import CardConfigMarketing from "./CardConfigMarketing";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const ModalFilter = ({ toggleModal, access, setConfig, listConfig }) => {
  const steps = ["لیست", "تنظیمات", "فیلتر"];

  const [stepNumber, setStepNumber] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [nobours, setNobours] = useState({
    enabled: true,
    name: null,
    birthday: { from: null, to: null },
    city: [],
    symbol: [],
    national_id: [],
    amount: { from: null, to: null },
    rate: { min: null, max: null },
    mobile: { num1: [], num2: [] },
  });

  const nextStep = () => stepNumber < 2 && setStepNumber(stepNumber + 1);
  const backStep = () => stepNumber > 0 && setStepNumber(stepNumber - 1);

  const PostData = () => {
    axios({
      method: "POST",
      url: `${OnRun}/marketing/fillter`,
      headers: { "content-type": "application/json" },
      data: {
        access: access,
        config: {
          nobours: nobours,
          send_time: "1722681000000",
          period: "daily",
        },
      },
    })
      .then(() => toast.success("Data submitted successfully!"))
      .catch(() => toast.error("An error occurred while submitting data!"));
  };

  const handleSelectTitle = (title) => {
    setSelectedTitle(title); 
    nextStep(); 
  };

  const renderFilters = () => (
    <>
      <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
        سهامداران غیر بورسی
      </h2>
      <div className="overflow-y-auto max-h-[calc(50vh-100px)]">
        <div className="bg-white rounded-lg p-6 shadow-inner">
          <NationalIdSearch nobours={nobours} setNobours={setNobours} />
          <NameSearch nobours={nobours} setNobours={setNobours} />
          <PhoneSearch nobours={nobours} setNobours={setNobours} />
          <CityFilter
            access={access}
            nobours={nobours}
            setNobours={setNobours}
          />
          <CompanyFilter
            access={access}
            nobours={nobours}
            setNobours={setNobours}
          />
          <Stocks nobours={nobours} setNobours={setNobours} />
          <Date nobours={nobours} setNobours={setNobours} />
        </div>
      </div>
      <button
        onClick={PostData}
        className="flex self-center mt-6 bg-green-500 text-white px-8 py-1 rounded-md shadow-md hover:bg-green-700 justify-center"
      >
        ایجاد
      </button>
    </>
  );
  const sendingOptions = () => {
    return (
      <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-xl">
        {/* عنوان */}
        <FormControl fullWidth className="mt-4">
          <InputLabel id="title-select-label"> عنوان</InputLabel>
          <Select
            labelId="title-select-label"
            id="title-select"
            // value={title}
            label="انتخاب عنوان"
            // onChange={handleTitle}
            className="bg-white"
          >
            <MenuItem > هیچ آیتمی انتخاب نشده</MenuItem>
          </Select>
        </FormControl>
  
        {/* تاریخ و زمان */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-right font-semibold mb-4">تاریخ و زمان ارسال</p>
          <div className="flex justify-center">
            <DatePicker
              format="MM/DD/YYYY HH:mm:ss"
              plugins={[<TimePicker position="bottom" />]}
              calendar={persian}
              // value={date}
              // onChange={setDate}
              locale={persian_fa}
              calendarPosition="bottom-right"
              className="w-full p-4 text-lg rounded-lg border border-gray-300 shadow-sm"
            />
          </div>
        </div>
  
        {/* زمان ارسال */}
        <FormControl fullWidth style={{ marginTop: "40px" }}>
          <InputLabel id="frequency-select-label">انتخاب تعداد ارسال</InputLabel>
          <Select
            labelId="frequency-select-label"
            id="frequency-select"
            // value={time}
            label="انتخاب تعداد ارسال"
            // onChange={handleChange}
            className="bg-white"
          >
            <MenuItem value="oneTime">یکبار</MenuItem>
            <MenuItem value="daily">روزانه</MenuItem>
            <MenuItem value="weekly">هفتگی</MenuItem>
            <MenuItem value="monthly">ماهانه</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  return (
    <div dir="rtl" className="relative w-full max-w-4xl max-h-screen rounded-xl p-6 overflow-y-auto">
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
            id={"0000"}
            setConfig={setConfig}
            onSelect={handleSelectTitle}  
          />
          {listConfig.map((i) => (
            <CardConfigMarketing
              key={i._id}
              profil={"*"}
              title={i.title}
              id={i._id}
              setConfig={setConfig}
              onSelect={handleSelectTitle}  
            />
          ))}
        </>
      )}
      {stepNumber === 1 && sendingOptions()}
      {stepNumber === 2 && renderFilters()}
      <div className="flex justify-between">
        <Button onClick={backStep}>قبلی</Button>
        <Button onClick={nextStep}>بعدی</Button>
      </div>
    </div>
  );
};

export default ModalFilter;

