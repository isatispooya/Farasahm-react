import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const Sending = ({ selectedTitle }) => {
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (selectedTitle) {
      setTitle(selectedTitle); // Set the title from the selected item in Step 1
    }
    console.log("Selected Title in Sending:", selectedTitle);  // Debugging: Check selected title in Sending component
  }, [selectedTitle]);

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-xl">
      {/* عنوان */}
      <FormControl fullWidth className="mt-4">
        <InputLabel id="title-select-label">انتخاب عنوان</InputLabel>
        <Select
          labelId="title-select-label"
          id="title-select"
          value={title || "هیچ آیتمی انتخاب نشده"}
          label="انتخاب عنوان"
          onChange={handleTitle}
          className="bg-white"
        >
          <MenuItem value={title}>{title}</MenuItem>

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
            value={date}
            onChange={setDate}
            locale={persian_fa}
            calendarPosition="bottom-right"
            className="w-full p-4 text-lg rounded-lg border border-gray-300 shadow-sm"
          />
        </div>
      </div>

      {/* زمان ارسال */}
      <FormControl fullWidth style={{marginTop:"40px"}}>
        <InputLabel id="frequency-select-label">انتخاب تعداد ارسال</InputLabel>
        <Select
          labelId="frequency-select-label"
          id="frequency-select"
          value={time}
          label="انتخاب تعداد ارسال"
          onChange={handleChange}
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
};

export default Sending;



