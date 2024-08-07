import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { OnRun } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MiniLoader from "./Loader/miniLoader";
const Smspage = ({toggleModal,access,Config,configSelected,get,textareaRef}) => {
  const [message, setMessage] = useState(Config.context || "");

  console.log(Config);
  console.log(Config);
  
  useEffect(()=>{
    if (Config.context) {
      setMessage(Config.context);
    }
  },[Config]);

  const handleWordSelect = (word) => {
    var newMesseg = message + ' {{' + word + '}} ';
    setMessage(newMesseg);
    if (textareaRef && textareaRef.current) {
      textareaRef.current.focus(); // فوکوس بر روی textarea بعد از انتخاب کلمه
    }
  }

  const edit_contex = () => {
    axios.post(OnRun + '/marketing/editcontext', {access: access, _id: configSelected, context: message})
    .then(response => {
      if (response.data.reply) {
        get();
      } else {
          toast.error("ارسال پیام با مشکل مواجه شد.", {
            position: "top-right",
            autoClose: 3000,
          });
      }
    });
  }

  const handleClose = () => {
    toggleModal(false);
  };

  return (
    <div dir="rtl" className="flex flex-col fixed inset-0 z-50 items-center overflow-y-scroll justify-center min-h-screen bg-gray-100 p-2">
      <p className="mb-1 text-sm">تعداد پیام ها: {Config.len}</p>
      <ToastContainer />
      <div className="flex w-full max-w-7xl items-center justify-center space-x-2">
        <div className="w-1/5 bg-white rounded-lg shadow-lg p-2 overflow-y-auto max-h-96">
          <div className="flex flex-col space-y-1">
            {
              Config.column?
              Config.column.map((word, index) => (
              <button
                key={index}
                onClick={() => handleWordSelect(word)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md text-sm"
              >
                {word}
              </button>
            ))
            :<MiniLoader/>
            
            }
          </div>
        </div>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-2/3 h-96 p-2 text-base border rounded-lg shadow-lg"
          placeholder="پیام خود را بنویسید..."
          style={{ direction: "rtl" }}
        />
      </div>
    

      {Config.dict && Config.dict.map((item, index) => {
        if (index < 2) {
          return(
            <div key={index} className="mt-4 p-2 w-full max-w-4xl bg-white rounded-lg shadow-lg">
              <h3 className="text-xl mb-1">پیش‌نمایش پیام:</h3>
              <p className="text-gray-700 text-sm" style={{ whiteSpace: "pre-wrap", direction: "rtl" }}>
                {item.result}
              </p>
            </div>
          );
        }
      })}

      <div className="flex self-center mr-28 mt-8 gap-8">
        <span>هزینه پیام : {Config.cost}</span>
        <span>تعداد پیام : {Config.count_sms}</span>
        <p className="mb-1 text-sm">تعداد افراد : {Config.len}</p>
      </div>

      <div className="flex gap-5 mt-2">
        <button
          onClick={edit_contex}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md text-sm"
        >
          ذخیره پیام
        </button>
        <button
          onClick={handleClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-md text-sm"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default Smspage;
