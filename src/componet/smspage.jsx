import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { OnRun } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MiniLoader from "./Loader/miniLoader";
import { IoCloseOutline } from "react-icons/io5";
import ConfirmationModal from "./confirmation";

const Smspage = ({
  toggleModal,
  access,
  Config,
  configSelected,
  get,
  textareaRef,
}) => {
  const [message, setMessage] = useState(Config.context || "");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [show, setShow] = useState(10);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // State for Close ConfirmationModal
  const [isSendConfirmationModalOpen, setIsSendConfirmationModalOpen] = useState(false); // State for Send ConfirmationModal
  const modalRef = useRef(null);

  useEffect(() => {
    if (Config.context) {
      setMessage(Config.context);
    }
  }, [Config]);

  const handleWordSelect = (word) => {
    const newMessage = message + ` {{${word}}} `;
    setMessage(newMessage);
    if (textareaRef && textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const editContext = () => {
    axios
      .post(OnRun + "/marketing/editcontext", {
        access,
        _id: configSelected,
        context: message,
      })
      .then((response) => {
        if (response.data.reply) {
          get();
          toast.success("پیام با موفقیت ذخیره شد.", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error("ارسال پیام با مشکل مواجه شد.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      });
  };

  const handleClose = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmClose = () => {
    setIsConfirmationModalOpen(false);
    toggleModal(false);
    editContext();
  };

  const handleCancelClose = () => {
    setIsConfirmationModalOpen(false);
  };

  const showPopUp = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const loadMessages = () => {
    setShow((prev) => prev + 10);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      hideModal();
    }
  };

  const handleSend = () => {
    setIsSendConfirmationModalOpen(true);
  };

  const handleConfirmSend = () => {
    setIsSendConfirmationModalOpen(false);
    sendRequest();
  };

  const handleCancelSend = () => {
    setIsSendConfirmationModalOpen(false);
  };

  const sendRequest = () => {
    axios
      .post(OnRun + "/marketing/set_status", {
        access,
        _id: configSelected,
        status: true,
      })
      .then((response) => {
        if (response.data.reply) {
          toast.success("پیام با موفقیت ذخیره شد.", {
            position: "top-right",
            autoClose: 3000,
          });
          toggleModal(false);
        } else {
          toast.error("ارسال پیام با مشکل مواجه شد.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error("ارسال پیام با مشکل مواجه شد.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  useEffect(() => {
    if (isModalVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalVisible]);

  return (
    <div
      dir="rtl"
      className="flex flex-col fixed inset-0 z-50 items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-white to-blue-200 p-4 overflow-y-auto"
    >
      <ToastContainer />

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 ">
        <div className="flex justify-between items-center mb-6">
          <p className="text-3xl font-extrabold text-gray-800">
            تعداد پیام‌ها: {Config.len}
          </p>
          <button
            onClick={handleClose}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg"
          >
            <IoCloseOutline className="text-3xl" />
          </button>
        </div>

        <div className="flex w-full gap-6">
          <div className="w-1/4 bg-gray-50 rounded-xl shadow-inner p-4 overflow-y-auto max-h-96 border border-gray-200">
            <div className="flex flex-col space-y-3">
              {Config.column ? (
                Config.column.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleWordSelect(word)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-3 rounded-lg shadow-md text-sm transition-all duration-200"
                  >
                    {word}
                  </button>
                ))
              ) : (
                <MiniLoader />
              )}
            </div>
          </div>

          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-3/4 h-96 p-4 text-lg border-2 border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="پیام خود را بنویسید..."
            style={{ direction: "rtl" }}
          />
        </div>

        <div className="flex justify-between items-center mt-8 ">
          <div className="text-lg text-gray-700 ">
          <div className="text-lg text-gray-700 flex space-x-8 space-x-reverse">
    <span className="font-bold text-xl">هزینه پیام: {Config.cost}</span>
    <span className="font-bold text-xl">تعداد پیام: {Config.count_sms}</span>
    <span className="font-bold text-xl">تعداد افراد: {Config.len}</span>
  </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={editContext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-200 transform hover:scale-105"
            >
              ذخیره پیام
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-200 transform hover:scale-105"
              onClick={showPopUp}
            >
              پیش‌نمایش
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-200 transform hover:scale-105"
              onClick={sendRequest}
            >
              ارسال
            </button>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-4/5 overflow-y-auto p-6"
          >
            <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-300">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-extrabold">پیش‌ نمایش پیام</h3>
                <button
                  onClick={hideModal}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
                >
                  بستن
                </button>
              </div>
            </div>

            <div className="p-4">
              {Config.dict &&
                Config.dict.slice(0, show).map((item, index) => (
                  <div
                    key={index}
                    className="mt-4 p-4 w-full bg-gray-50 rounded-lg shadow border border-gray-200"
                  >
                    <div className="flex flex-wrap items-center mb-4">
                      <div className="flex items-center mb-2 w-full sm:w-1/2">
                        <span className="font-bold text-blue-700">
                          نام و نام خانوادگی:
                        </span>
                        <p className="mr-2">{item["نام و نام خانوادگی"]}</p>
                      </div>
                      <div className="flex items-center mb-2 w-full sm:w-1/2">
                        <span className="font-bold text-blue-700">
                          شماره تماس:
                        </span>
                        <p className="mr-2">{item["شماره تماس"]}</p>
                      </div>
                    </div>
                    <div className="flex flex-col mb-2">
                      <span className="font-bold text-lg text-blue-700">
                        نتیجه:
                      </span>
                      <p
                        className="text-gray-700 text-base"
                        style={{ whiteSpace: "pre-wrap", direction: "rtl" }}
                      >
                        {item.result}
                      </p>
                    </div>
                  </div>
                ))}

              {show < Config.dict.length && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={loadMessages}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-200 transform hover:scale-105"
                  >
                    نمایش بیشتر
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        message="آیا مطمئن هستید که می‌خواهید این صفحه را ببندید؟"
        onConfirm={handleConfirmClose}
        onCancel={handleCancelClose}
      />

      <ConfirmationModal
        isOpen={isSendConfirmationModalOpen}
        message="آیا مطمئن هستید که می‌خواهید پیام را ارسال کنید؟"
        onConfirm={handleConfirmSend}
        onCancel={handleCancelSend}
      />
    </div>
  );
};

export default Smspage;

