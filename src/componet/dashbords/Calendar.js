import axios from "axios";
import { useState, useContext, useEffect } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { BsArrowRepeat } from "react-icons/bs";
import DatePicker, { DateObject, Calendar } from "react-multi-date-picker";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import { OnRun } from "../../config/config";
import { AccessContext } from "../../config/accessContext";

const CalendarCom = () => {
  const [values, setValues] = useState([]);
  const access = useContext(AccessContext);

  const get = () => {
    axios.post(OnRun + "/getholliday", { access: access }).then((response) => {
      var date = response.data.df.map((i) => {
        const date = new Date(i);
        var dt = new DateObject({ calendar: persian, date: date });
        return dt;
      });
      setValues(date);
    });
  };

  const apply = () => {
    axios
      .post(OnRun + "/setholliday", { access: access, dates: values })
      .then((response) => {
        console.log(response);
        console.log(values);
      });
  };

  useEffect(get, []);

  return (
    <div className="subPage tablePg">
      <div className="tls">
        <h2 className="titlePage">تقویم</h2>
        <div className="btntls">
          <p className="inp-fld" onClick={apply}>
            بروزرسانی
            <BsArrowRepeat />
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <Calendar
          fullYear
          highlightToday={false}
          className="red"
          multiple
          value={values}
          onChange={setValues}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
        />
      </div>
    </div>
  );
};

export default CalendarCom;
