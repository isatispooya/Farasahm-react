import React, { useState, useRef } from "react";
import axios from "axios";
import { OnRun } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Smspage = ({ toggleModal, access, columns, Config, len }) => {
  const [message, setMessage] = useState("");
  const [context, setContext] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const textareaRef = useRef(null);

  const handleWordSelect = (word) => {
    setMessage((prevMessage) => prevMessage + " " + word + " ");
    textareaRef.current.focus();
  };

  const handleClose = () => {
    toggleModal(false);
  };

  const handlePreview = () => {
    sendMessageToBackend();
  };

  const handleSend = () => {
    send();
    setTimeout(()=>{
      handleClose()
    },4000)
  };

  const sendMessageToBackend = () => {
    axios({
      method: "POST",
      url: `${OnRun}/marketing/perviewcontext`,
      data: { access: access, context: message, _id: Config },
    })
      .then((response) => {
        setContext(response.data);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  };

  const send = () => {
    axios({
      method: "POST",
      url: `${OnRun}/marketing/sendsms`,
      data: { access: access, context: message, _id: Config },
    })
      .then((response) => {
        setSendMessage(response.data);
        console.log("response", response.data);
        if (response.data.reply) {
          toast.success("پیام با موفقیت ارسال شد!", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error("ارسال پیام با مشکل مواجه شد.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.error("There was an error with the request:", error);
        toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div dir="rtl" className="flex flex-col fixed inset-0 z-50 items-center justify-center min-h-screen bg-gray-100 p-2">
      <p className="mb-1 text-sm">تعداد پیام ها: {len}</p>
      <ToastContainer />
      <div className="flex w-full max-w-7xl items-center justify-center space-x-2">
        <div className="w-1/5 bg-white rounded-lg shadow-lg p-2 overflow-y-auto max-h-96">
          <div className="flex flex-col space-y-1">
            {columns.map((word, index) => (
              <button
                key={index}
                onClick={() => handleWordSelect(word)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md text-sm"
              >
                {word}
              </button>
            ))}
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
      <div className="flex gap-5 mt-2">
        <button
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md text-sm"
        >
          ارسال
        </button>
        <button
          onClick={handlePreview}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md text-sm"
        >
          پیش نمایش
        </button>
        <button
          onClick={handleClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-md text-sm"
        >
          بستن
        </button>
      </div>

      {context.dict && context.dict.map((item, index) => (
        <div key={index} className="mt-4 p-2 w-full max-w-4xl bg-white rounded-lg shadow-lg">
          <h3 className="text-xl mb-1">پیش‌ نمایش پیام:</h3>
          <p className="text-gray-700 text-sm" style={{ whiteSpace: "pre-wrap", direction: "rtl" }}>
            {item.result}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Smspage;

