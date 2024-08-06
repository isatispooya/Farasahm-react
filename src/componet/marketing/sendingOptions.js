import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import InputIcon from "react-multi-date-picker/components/input_icon";

const SendingOptions = ({ loading, config, setConfig }) => {
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
              value={config.title || ""}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              variant="outlined"
            />
          </FormControl>
          <div className="mt-8 p-4 bg-blue-100 rounded-lg ">
            <p className="text-right font-semibold mb-4">تاریخ و زمان ارسال</p>
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
                onChange={(date) =>
                  setConfig({ ...config, send_time: date.toDate().getTime() })
                }
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
              label="انتخاب دوره ارسال"
              onChange={(e) => setConfig({ ...config, period: e.target.value })}
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

export default SendingOptions;
