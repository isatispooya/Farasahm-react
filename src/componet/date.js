import React from 'react';
import DatePicker from "react-multi-date-picker"
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';


const Date = () => {
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
  
    return (
        <>
            <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
    
    
        <div className="flex items-center ml-4">
          <DatePicker
            selected={startDate}
            calendar={persian}
            locale={persian_fa}
            onChange={(date) => setStartDate(date)}
            className="border p-2"
            dateFormat="yyyy/MM/dd"
          />
          <span className="mx-2">تا</span>
          <DatePicker
            selected={endDate}
            calendar={persian}
            locale={persian_fa}
            onChange={(date) => setEndDate(date)}
            className="border p-2"
            dateFormat="yyyy/MM/dd"
          />
        </div>
      </div>
   
    </div>    
        </>
    );
}

export default Date;
