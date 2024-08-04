import React, { useEffect, useState } from "react";
import NationalIdSearch from "./nationalFilter";
import CompanyFilter from "./comanyFilter";
import CityFilter from "./cityFilter";
import Stocks from "./Stocks";
import Date from "./birthDate";
import PhoneSearch from "./phoneFilter";
import NameSearch from "./name";
import axios from "axios";
import { OnRun } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import CardConfigMarketing from "./CardConfigMarketing"
import Sending from "./sending";

const ModalFilter = ({ toggleModal, access  }) => {
  const steps = ["لیست", "تنظیمات", "فیلتر"];
  const [configSelected, setConfigSelected] = useState(null)
  const [stepNumber, setStepNumber] = useState(0);
  const [config, setConfig] = useState(
    {
      "send_time": null,
        "context": "",
        "period": "ones",
        "nobours": {
            "enabled": true,
            "name": null,
            "birthday": {
                "from": null,
                "to": null
            },
            "city": [],
            "symbol": [],
            "national_id": [],
            "amount": {
                "from": null,
                "to": null
            },
            "rate": {
                "min": null,
                "max": null
            },
            "mobile": {
                "num1": [],
                "num2": []
            }
        }
      }
      )
  const [listConfig, setListConfig] = useState([])


  const getConfigList = () => {
    axios({
      method: "POST",
      url: OnRun + "/marketing/marketinglist",
      data: { access: access },
    }).then((response) => {
      setListConfig(response.data);

    });
  };


  const nextStep = () => stepNumber < 2 && setStepNumber(stepNumber + 1);
  const backStep = () => stepNumber > 0 && setStepNumber(stepNumber - 1);




  const PostData = () => {
    axios({
      method: "POST",
      url: `${OnRun}/marketing/fillter`,
      headers: { "content-type": "application/json" },
      data: {
        access: access,
        config: config,
      },
    })
      .then(() => toast.success("Data submitted successfully!"))
      .catch(() => toast.error("An error occurred while submitting data!"));
  };


  const getConfig = () => {
    if (configSelected) {
      axios({
        method: "POST",
        url: `${OnRun}/marketing/perviewcontext`,
        data: { access: access, context: '', _id: configSelected },
      })
        .then((response) => {
          setConfig(response.data.config);
          
              })
        .catch((error) => {
          console.error("error:", error);
        });
    }else{
      setConfig(    {
        "send_time": null,
          "context": "",
          "period": "ones",
          "nobours": {
              "enabled": true,
              "name": null,
              "birthday": {
                  "from": null,
                  "to": null
              },
              "city": [],
              "symbol": [],
              "national_id": [],
              "amount": {
                  "from": null,
                  "to": null
              },
              "rate": {
                  "min": null,
                  "max": null
              },
              "mobile": {
                  "num1": [],
                  "num2": []
              }
          }
        })
    }
    nextStep()

  };


  useEffect(getConfig,[configSelected])
  useEffect(getConfigList,[])


  const renderFilters = () => (
    <>
      <h2 className="text-xl mt-8 font-bold mb-6 text-center text-gray-800">
        سهامداران غیر بورسی
      </h2>
      <div className="overflow-y-auto max-h-[calc(80vh-180px)]">
        <div className="bg-white rounded-lg p-6 shadow-inner">
          <NationalIdSearch nobours={nobours} setNobours={setNobours} />
          <NameSearch nobours={nobours} setNobours={setNobours} />
          <PhoneSearch nobours={nobours} setNobours={setNobours} />
          <CityFilter access={access} config={config} setConfig={setConfig} />
          <CompanyFilter access={access} nobours={nobours} setNobours={setNobours} />
          <Stocks nobours={nobours} setNobours={setNobours} />
          <Date nobours={nobours} setNobours={setNobours} />
        </div>
      </div>
      <div className="flex self-center justify-center w-full mt-6">
      <button
        onClick={PostData}
        className="bg-green-500 text-white px-8 py-1 rounded-md shadow-md hover:bg-green-700"
      >
        ایجاد
      </button>
    </div>
    </>
  );

  return (
    <div dir="rtl" className="relative w-full max-w-6xl max-h-screen rounded-xl p-6 overflow-y-auto">
      <ToastContainer />
      <Stepper activeStep={stepNumber}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {stepNumber === 0 && (
        <>
          <CardConfigMarketing profil={"+"} title={"جدید"} id={null} setConfigSelected={setConfigSelected} />
          {listConfig.map((i) => (
            <CardConfigMarketing key={i._id} profil={"*"} title={i.title} id={i._id} setConfigSelected={setConfigSelected} />
          ))}
        </>
      )}
      {stepNumber === 1 && <Sending/>}
      {stepNumber === 2 && renderFilters()}
      <div className="flex justify-between">
      <Button disabled={stepNumber==0} onClick={nextStep}>بعدی</Button>
      <Button disabled={stepNumber==0} onClick={backStep}>قبلی</Button>
      </div>
    </div>
  );
};

export default ModalFilter;

