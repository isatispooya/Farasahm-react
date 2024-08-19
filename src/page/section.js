import { useState, useEffect } from "react";
import { getCookie, setCookie } from "../componet/cookie/cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { OnRun } from "../config/config";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useCheckid } from "../hook";
import { IoSettings } from "react-icons/io5";

const Section = () => {
  const { data, isLoading } = useCheckid(getCookie("id"));

  const [access, setAccess] = useState("");

  const navigate = useNavigate();

  const exitBtn = () => {
    setCookie("id", "", 0);
    setCookie("symbol", "", 0);
    navigate("/");
  };

  const navigateSettings = () => {
    navigate("/settings");
  };

  const toDesk = (name, firstPage) => {
    setCookie("symbol", name, 365);
    navigate("/desk/" + firstPage);
  };

  const accessCheck = () => {
    const id = getCookie("id");
    if (id) {
      axios({ method: "POST", url: OnRun + "/access", data: { id: id } }).then(
        (response) => {
          if (response.data.replay) {
            setAccess(response.data);
          } else {
            setCookie("id", "", 0);
            navigate("/");
          }
        }
      );
    } else {
      navigate("/");
    }
  };

  useEffect(accessCheck, []);

  return (
    <div className="min-h-screen  bg-white text-black p-4" dir="rtl">
      <div className="container mx-auto">
        <div className="flex justify-between  items-center py-4 border-2 rounded-lg shadow-md  ">
          <button
            onClick={navigateSettings}
            className="flex items-center text-black hover:text-black transition mr-2"
          >
            <h2 className="text-xl ml-2">تنظیمات</h2>
            <IoSettings className="text-3xl " />
          </button>
          <button
            onClick={exitBtn}
            className="flex items-center text-red-500 hover:text-red-400 transition"
          >
            <p className="mr-2 text-xl">خروج</p>
            <AiOutlinePoweroff className="text-3xl ml-2 mr-2 text-red-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
            <h4 className="text-lg font-semibold mb-4">ناشران</h4>
            <div className="space-y-4">
              {access["enabled"] &&
                access["enabled"].map((i) => {
                  if (i["type"] === "boursiCompany") {
                    const img = "/img/" + i["icon"];
                    return (
                      <div
                        onClick={() => toDesk(i["name"], i["firstPage"])}
                        key={i["name"]}
                        className="flex items-center p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition shadow-sm hover:shadow-md"
                      >
                        <img src={img} alt="icon" className="w-12 h-12 ml-4" />
                        <div>
                          <h6 className="text-base">{i["symbol"]}</h6>
                          <p className="text-sm text-gray-600">
                            {i["fullName"]}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              {access["disabled"] &&
                access["disabled"].map((i) => {
                  if (i["type"] === "boursiCompany") {
                    const img = "/img/" + i["icon"];
                    return (
                      <div
                        key={i["name"]}
                        className="flex items-center p-4 bg-blue-50 rounded-lg opacity-50 cursor-not-allowed shadow-sm"
                      >
                        <img src={img} alt="icon" className="w-12 h-12 ml-4" />
                        <div>
                          <h6 className="text-base">{i["symbol"]}</h6>
                          <p className="text-sm text-gray-600">
                            {i["fullName"]}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
            <h4 className="text-lg font-semibold mb-4">داشبرد</h4>
            <div className="space-y-4">
              {access["enabled"] &&
                access["enabled"].map((i) => {
                  if (i["type"] === "desk") {
                    const img = "/img/" + i["icon"];
                    return (
                      <div
                        onClick={() => toDesk(i["name"], "wellcom")}
                        key={i["name"]}
                        className="flex items-center p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition shadow-sm hover:shadow-md"
                      >
                        <img src={img} alt="icon" className="w-12 h-12 ml-4" />
                        <div>
                          <h6 className="text-base">{i["symbol"]}</h6>
                          <p className="text-sm text-gray-600">
                            {i["fullName"]}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              {access["disabled"] &&
                access["disabled"].map((i) => {
                  if (i["type"] === "desk") {
                    const img = "/img/" + i["icon"];
                    return (
                      <div
                        key={i["name"]}
                        className="flex items-center p-4 bg-blue-50 rounded-lg opacity-50 cursor-not-allowed shadow-sm"
                      >
                        <img src={img} alt="icon" className="w-12 h-12 ml-4" />
                        <div>
                          <h6 className="text-base">{i["symbol"]}</h6>
                          <p className="text-sm text-gray-600">
                            {i["fullName"]}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
            <h4 className="text-lg font-semibold mb-4">ابزار های مالی</h4>
            <div className="space-y-4">
              {access["enabled"] &&
                access["enabled"].map((i) => {
                  if (i["type"] === "financialToos") {
                    const img = "/img/" + i["icon"];
                    return (
                      <div
                        onClick={() => toDesk(i["name"], i["firstPage"])}
                        key={i["name"]}
                        className="flex items-center p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition shadow-sm hover:shadow-md"
                      >
                        <img src={img} alt="icon" className="w-12 h-12 ml-4" />
                        <div>
                          <h6 className="text-base">{i["symbol"]}</h6>
                          <p className="text-sm text-gray-600">
                            {i["fullName"]}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              {access["disabled"] &&
                access["disabled"].map((i) => {
                  if (i["type"] === "financialToos") {
                    const img = "/img/" + i["icon"];
                    return (
                      <div
                        key={i["name"]}
                        className="flex items-center p-4 bg-blue-50 rounded-lg opacity-50 cursor-not-allowed shadow-sm"
                      >
                        <img src={img} alt="icon" className="w-12 h-12 ml-4" />
                        <div>
                          <h6 className="text-base">{i["symbol"]}</h6>
                          <p className="text-sm text-gray-600">
                            {i["fullName"]}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
          <h4 className="text-lg text-black font-semibold mb-4">
            شرکت های گروه مالی ایساتیس
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {access["enabled"] &&
              access["enabled"].map((i) => {
                if (i["type"] === "company") {
                  const img = "/img/" + i["icon"];
                  return (
                    <div
                      onClick={() => toDesk(i["name"], i["firstPage"])}
                      key={i["name"]}
                      className="flex items-center p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition shadow-sm hover:shadow-md w-full sm:w-auto"
                    >
                      <img src={img} alt="icon" className="w-10 h-10 ml-4" />
                      <div>
                        <h6 className="text-base">{i["symbol"]}</h6>
                        <p className="text-sm text-gray-600">{i["fullName"]}</p>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            {access["disabled"] &&
              access["disabled"].map((i) => {
                if (i["type"] === "company") {
                  const img = "/img/" + i["icon"];
                  return (
                    <div
                      key={i["name"]}
                      className="flex items-center p-3 bg-blue-50 rounded-lg opacity-50 cursor-not-allowed shadow-sm w-full sm:w-auto"
                    >
                      <img src={img} alt="icon" className="w-10 h-10 ml-4" />
                      <div>
                        <h6 className="text-base">{i["symbol"]}</h6>
                        <p className="text-sm text-gray-600">{i["fullName"]}</p>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
