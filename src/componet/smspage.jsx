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
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // State for ConfirmationModal
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
      className="flex flex-col fixed inset-0 z-50 items-center overflow-y-auto justify-center min-h-screen bg-gray-200 p-4"
    >
      <ToastContainer />

      <div className="flex flex-col w-full max-w-7xl bg-white rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <p className=" font-bold text-xl text-gray-700">
            تعداد پیام‌ها: {Config.len}
          </p>
          <button
            onClick={handleClose}
            className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-md text-sm"
          >
            <IoCloseOutline className="text-4xl" />
          </button>
        </div>

        <div className="flex w-full gap-4">
          <div className="w-1/5 bg-gray-100 rounded-lg shadow-lg p-4 overflow-y-auto max-h-96">
            <div className="flex flex-col space-y-2">
              {Config.column ? (
                Config.column.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleWordSelect(word)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-md text-sm"
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
            className="w-4/5 h-96 p-4 text-base border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="پیام خود را بنویسید..."
            style={{ direction: "rtl" }}
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className=" ml-2 text-sm text-gray-700">
            <span className=" m-5 font-bold text-xl">
              هزینه پیام: {Config.cost}
            </span>
            <span className="ml-4 font-bold text-xl ">
              تعداد پیام: {Config.count_sms}
            </span>
            <span className="ml-4 font-bold text-xl">
              تعداد افراد: {Config.len}
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={editContext}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm"
            >
              ذخیره پیام
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md text-sm"
              onClick={showPopUp}
            >
              پیش‌نمایش
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md text-sm"
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
            className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-4/5 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-300">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">پیش‌ نمایش پیام</h3>
                <button
                  onClick={hideModal}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
                >
                  بستن
                </button>
              </div>
            </div>

            <div className="p-6">
              {Config.dict &&
                Config.dict.slice(0, show).map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="mt-4 p-4 w-full bg-white rounded-lg shadow-lg border border-gray-300"
                    >
                      <div className="flex flex-wrap items-center mb-2">
                        <div className="flex items-center mb-2 w-full sm:w-1/2">
                          <span className="font-bold text-blue-800">
                            نام و نام خانوادگی:
                          </span>
                          <p className="mr-2">{item["نام و نام خانوادگی"]}</p>
                        </div>
                        <div className="flex items-center mb-2 w-full sm:w-1/2">
                          <span className="font-bold text-blue-800">
                            شماره تماس:
                          </span>
                          <p className="mr-2">{item["شماره تماس"]}</p>
                        </div>
                      </div>
                      <div className="flex flex-col mb-2">
                        <span className="font-bold text-lg text-blue-800">
                          نتیجه:
                        </span>
                        <p
                          className="text-gray-700 text-sm"
                          style={{ whiteSpace: "pre-wrap", direction: "rtl" }}
                        >
                          {item.result}
                        </p>
                      </div>
                    </div>
                  );
                })}

              {show < Config.dict.length && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={loadMessages}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
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
    </div>
  );
};

export default Smspage;
