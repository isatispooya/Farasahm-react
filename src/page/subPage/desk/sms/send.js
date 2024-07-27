import { useContext, useEffect, useState, useCallback, useRef } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import axios from "axios";
import { AccessContext } from "../../../../config/accessContext";
import { OnRun } from "../../../../config/config";
import MiniLoader from "../../../../componet/Loader/miniLoader";
import NoData from "../../../../componet/Loader/NoData";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { toast } from "react-toastify";
import AccessFilter from "../../../../componet/access/accessFilter";

const Modal = ({
  showModal,
  handleClose,
  title,
  setTitle,
  date,
  handleDateChange,
  message,
  setMessage,
  handleSendSMS,
}) => {
  if (!showModal) return null;

  return (
    <>
      <div>hello</div>
    </>
    // <div className="overflow-y-auto overflow-x-hidden fixed top-24 lg:px-52 lg:py-32 z-50 bg-white bg-opacity-65 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    //   <div className="relative p-4 w-full max-w-md max-h-full">
    //     <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
    //       <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
    //         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
    //           ارسال پیامک
    //         </h3>
    //         <button
    //           type="button"
    //           onClick={handleClose}
    //           className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
    //         >
    //           <svg
    //             className="w-3 h-3"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 14 14"
    //           >
    //             <path
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
    //             />
    //           </svg>
    //           <span className="sr-only">Close modal</span>
    //         </button>
    //       </div>
    //       <div className="p-4 md:p-5">
    //         <div className="grid gap-4 mb-4 grid-cols-2">
    //           <div className="col-span-2">
    //             <label
    //               htmlFor="title"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               عنوان
    //             </label>
    //             <input
    //               value={title}
    //               onChange={(e) => setTitle(e.target.value)}
    //               type="text"
    //               name="title"
    //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    //               placeholder="عنوان را وارد کنید"
    //               required
    //             />
    //           </div>
    //           <div className="col-span-2">
    //             <label
    //               htmlFor="date"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               تاریخ و زمان
    //             </label>
    //             <DatePicker
    //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    //               format="MM/DD/YYYY HH:mm:ss"
    //               plugins={[<TimePicker position="bottom" />]}
    //               calendar={persian}
    //               locale={persian_fa}
    //               value={date}
    //               calendarPosition="bottom-right"
    //               onChange={handleDateChange}
    //             />
    //           </div>
    //           <div className="col-span-2">
    //             <label
    //               htmlFor="message"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               پیام
    //             </label>
    //             <textarea
    //               value={message}
    //               onChange={(e) => setMessage(e.target.value)}
    //               rows="4"
    //               className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               placeholder="متن پیام را وارد کنید"
    //             ></textarea>
    //           </div>
    //         </div>
    //         <button
    //           onClick={handleSendSMS}
    //           type="submit"
    //           className="text-white inline-flex items-center bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //         >
    //           <svg
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             height="1em"
    //             width="1em"
    //             className="me-1 -ms-1 w-5 h-5"
    //           >
    //             <path
    //               fill="currentColor"
    //               d="M20.328 11v2H7.5l3.243 3.243-1.415 1.414L3.672 12l5.656-5.657 1.415 1.414L7.5 11h12.828z"
    //             />
    //           </svg>
    //           ارسال
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

const SendSMS = () => {
  const access = useContext(AccessContext);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [filter, setFilter] = useState("");
  const tableRef = useRef(null);

  const handleOpen = () => setShowModal(!showModal);
  const handleDateChange = (e) => setDate(e);

  const handleSlectedData = () => {
    handleOpen();
    setSelectedData(tableRef.current.getSelectedData());
  };

  const GetData = () => {
    console.log(`${OnRun}/marketing/companies_shareholders`);

    axios
      .post(`${OnRun}/marketing/companies_shareholders`, { access: access })

      .then((response) => {
        setData1(response.data);
        console.log(`${OnRun}/marketing/companies_shareholders`, {
          access: access,
        });
      })
      .catch((error) => {
        console.error(error, "error on posting");
      });
  };
  useEffect(() => {
    GetData();
  });
  const handleSendSMS = () => {
    axios
      .post(`${OnRun}/sendsmsgroup`, {
        access: access,
        data: {
          title: title,
          date: date,
          message: message,
          selectData: selectedData,
        },
      })
      .then((response) => {
        if (response.data) {
          toast.success("ارسال شد", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setDate("");
          setMessage("");
          setTitle("");
          setSelectedData([]);
        }
      })
      .catch((error) => {
        toast.error("خطایی رخ داد", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.error(error);
      });
    handleOpen();
  };

  const getTable = useCallback(() => {
    axios
      .post(OnRun + "/customerphonebook", { access: access })
      .then((response) => {
        if (response.data.reply) {
          setData(response.data.df);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [access]);

  useEffect(() => {
    getTable();
  }, [getTable]);

  // useEffect(() => {
  //   if (data) {
  //     tableRef.current = new Tabulator("#data-table", {
  //       data: data,
  //       layout: "fitColumns",
  //       responsiveLayout: true,
  //       columnHeaderSortMulti: true,
  //       pagination: "local",
  //       paginationSize: 50,
  //       paginationSizeSelector: [10, 20, 50, 100, 200, 500],
  //       movableColumns: true,
  //       layoutColumnsOnNewData: false,
  //       textDirection: "rtl",
  //       autoResize: false,
  //       dataTree: true,
  //       dataTreeStartExpanded: false,
  //       selectable: true,
  //       columns: [
  //         {
  //           editor: true,
  //           titleFormatter: "rowSelection",
  //           hozAlign: "center",
  //           headerSort: false,
  //         },
  //         {
  //           title: "نام",
  //           field: "نام و نام خانوادگی",
  //           hozAlign: "center",
  //           headerHozAlign: "center",
  //           resizable: true,
  //           widthGrow: 2,
  //           headerFilter: "input",
  //         },
  //         {
  //           title: "کد ملی",
  //           field: "کد ملی",
  //           hozAlign: "center",
  //           headerHozAlign: "center",
  //           resizable: true,
  //           widthGrow: 2,
  //           headerFilter: "input",
  //         },
  //         {
  //           title: "شماره تماس",
  //           field: "شماره تماس",
  //           hozAlign: "center",
  //           headerHozAlign: "center",
  //           resizable: true,
  //           widthGrow: 2,
  //           headerFilter: "input",
  //         },
  //       ],
  //     });

  //     if (filter) {
  //       tableRef.current.setFilter("source", "=", filter);
  //     } else {
  //       tableRef.current.clearFilter();
  //     }
  //   }
  // }, [data, filter]);

  const handleFilterChange = (selectedOption) => {
    setFilter(selectedOption);
  };

  return (
    <>
      <div className="flex w-screen px-auto p-10" dir="rtl">
        <div className="max-w-full overflow-x-auto shadow-md border border-gray-300 rounded-lg w-full p-5">
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 m-5">
            <div>
              {/* <button
                onClick={handleSlectedData}
                className="inline-flex p-2 bg-green-500 hover:bg-green-600 rounded-xl text-white text-base font-semibold px-3"
              >
                ارسال پیامک
              </button> */}
            </div>
            <div>
              <AccessFilter onFilterChange={handleFilterChange} />
            </div>
          </div>
          <div className="subPage tablePg">
            {data === null ? (
              <MiniLoader />
            ) : data === false ? (
              <NoData />
            ) : (
              <div id="data-table"></div>
            )}
          </div>

          <Modal
            showModal={showModal}
            handleClose={handleOpen}
            title={title}
            setTitle={setTitle}
            date={date}
            handleDateChange={handleDateChange}
            message={message}
            setMessage={setMessage}
            handleSendSMS={handleSendSMS}
          />
        </div>
      </div>
    </>
  );
};

export default SendSMS;
