import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function Example({nobours,setNobours}) {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  useEffect(()=>{
    setNobours({...nobours,mobile:{from:from,to:to}})
  },[from,to])


  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-xl mb-2 font-bold w-full mt-2">
       انتخاب تاریخ تولد    
      </div>
      <div style={{ direction: "rtl" }} className="flex justify-center gap-4">
        <div>
          <p className="text-center">از تاریخ</p>
          <DatePicker
            calendar={persian}
            value={to}
            onChange={(date) => {
              setTo(date);
            }}
            locale={persian_fa}
            calendarPosition="bottom-left"
          />
        </div>
        <div>
          <p className="text-center">تا تاریخ</p>
          <DatePicker
            calendar={persian}
            value={from}
            onChange={setFrom}
            locale={persian_fa}
            calendarPosition="bottom-right"
          />
        </div>
      </div>
    </div>
  );
}
