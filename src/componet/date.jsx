import React from "react";
import Modal from "react-modal";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

Modal.setAppElement("#root"); // Ensure to set the app element for accessibility

const DateComponent = () => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [dateRange, setDateRange] = React.useState("");
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

    React.useEffect(() => {
        if (startDate && endDate) {
            const startFormatted = startDate.format("YYYY/MM/DD");
            const endFormatted = endDate.format("YYYY/MM/DD");
            setDateRange(`${startFormatted} - ${endFormatted}`);
        }
    }, [startDate, endDate]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

    return (
        <><div dir='rtl' className="container mx-auto p-4 flex flex-col items-center">
        <button onClick={openModal} className="p-2 bg-blue-500 flex justify-center items-center text-white rounded mb-4">
          انتخاب تاریخ
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Date Picker Modal"
          className="fixed inset-0 z-30 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
            <div className="flex justify-evenly items-center mb-4">
              <DatePicker
                value={startDate}
                onChange={setStartDate}
                calendar={persian}
                locale={persian_fa}
                className="border p-2 mb-4"
                format="YYYY/MM/DD"
                render={(value, openCalendar) => (
                  <div onClick={openCalendar} className="p-2 bg-blue-500 text-white rounded cursor-pointer flex justify-center items-center">
                    {value || "انتخاب تاریخ شروع"}
                  </div>
                )}
                header={({ date, ...props }) => (
                  <div className="flex items-center justify-between p-2">
                    <span>{date.year} / {date.month.name}</span>
                    <button onClick={props.openCalendar} className="text-blue-500">انتخاب تاریخ</button>
                  </div>
                )} />
              <DatePicker
                value={endDate}
                onChange={setEndDate}
                calendar={persian}
                locale={persian_fa}
                className="border p-2"
                format="YYYY/MM/DD"
                render={(value, openCalendar) => (
                  <div onClick={openCalendar} className="p-2 bg-blue-500 text-white rounded cursor-pointer flex justify-center items-center">
                    {value || "انتخاب تاریخ پایان"}
                  </div>
                )}
                header={({ date, ...props }) => (
                  <div className="flex items-center justify-between p-2">
                    <button onClick={props.openCalendar} className="text-blue-500">انتخاب تاریخ</button>
                  </div>
                )} />
            </div>
            <button onClick={closeModal} className="mt-4 p-2 bg-red-500 text-white rounded mx-auto">بستن</button>
          </div>
          )}
          header={({ date, ...props }) => (
            <div className="flex items-center justify-between p-2">
              <span>
                {date.year} / {date.month.name}
              </span>
              <button
                onClick={props.openCalendar}
                className="text-blue-500"
              >
                انتخاب تاریخ
              </button>
            </div>
          )}
          />
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            calendar={persian}
            locale={persian_fa}
            className="border p-2"
            format="YYYY/MM/DD"
            render={(value, openCalendar) => (
              <div
                onClick={openCalendar}
                className="p-2 bg-blue-500 text-white rounded cursor-pointer flex justify-center items-center"
              >
                {value || "انتخاب تاریخ پایان"}
              </div>
            )}
            header={({ date, ...props }) => (
              <div className="flex items-center justify-between p-2">
                <span>
                  {date.year} / {date.month.name}
                </span>
                <button
                  onClick={props.openCalendar}
                  className="text-blue-500"
                >
                  انتخاب تاریخ
                </button>
              </div>
            )} />
        </></div><button
          onClick={closeModal}
          className="mt-4 p-2 bg-red-500 text-white rounded mx-auto"
        >
          بستن
        </button></>
        </div>
      </Modal>
      <input
        type="text"
        placeholder="زمان"
        value={dateRange}
        readOnly
        className="border  p-2 w-96 mt-4"
      />
    </div>
  );
};

export default DateComponent;
