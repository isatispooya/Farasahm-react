import React, { useState, useEffect } from "react";

import { DateObject } from "react-multi-date-picker";
import SendingOptions from "./marketingCom/sendingOptions";
import RenderFilters from "./marketingCom/renderFilters";
import {
  Button,

  Step,
  StepLabel,
  Stepper,

  Grid,
} from "@mui/material";
import CardConfigMarketing from "./CardConfigMarketing";

import axios from "axios";
import { OnRun } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GoPlus } from "react-icons/go";

const ModalFilter = ({
  access,
  configSelected,
  setConfigSelected,
  setIsContextSelected,
  setIsOpenFilter,
}) => {
  const newconfig = {
    send_time: new DateObject(),
    context: null,
    period: null,
    insurance: {
      enabled: true,
      accounting: {
        from: "",
        to: "",
        code: "",
      },
    },
    nobours: {
      enabled: true,
      name: null,
      birthday: {
        from: null,
        to: null,
      },
      city: [],
      symbol: [],
      national_id: [],
      amount: {
        from: null,
        to: null,
      },
      rate: {
        min: null,
        max: null,
      },
      mobile: {
        num1: [],
        num2: [],
      },
    },

    title: "",
  };

  const steps = ["لیست", "تنظیمات", "فیلتر"];
  const [stepNumber, setStepNumber] = useState(0);
  const [config, setConfig] = useState(newconfig);
  const [listConfig, setListConfig] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log("================================\n", config);

  const getConfigList = () => {
    axios
      .post(OnRun + "/marketing/marketinglist", { access: access })
      .then((response) => {
        setListConfig(response.data);
      });
  };

  const nextStep = () => stepNumber < 2 && setStepNumber(stepNumber + 1);
  const backStep = () => stepNumber > 0 && setStepNumber(stepNumber - 1);



  

  const getConfig = async () => {
    setLoading(true);
    
    if (configSelected) {
      
     await axios
        .post(`${OnRun}/marketing/perviewcontext`, {
          access: access,
          context: "",
          _id: configSelected,
        })
        .then((response) => {

          console.log("*****************************\n",response.data);
          
          if (response.data && response.data.config) {
            response.data.config["title"] = response.data["title"];
            setConfig(response.data);
          } else {
            console.error("Config data is missing or invalid");
          }
        })
        .catch((error) => {
          console.error("Error fetching selected config:", error);
          toast.error("خطا در دریافت تنظیمات انتخاب شده");
        });
    } else {
      setConfig(newconfig);
    }
    setLoading(false);

  };


  const PostData = async () => {
    if (config.title !== "") {
      alert("title");
    } else if (config.send_time !== null) {
      alert("send_time");
    } else if (config.period !== null) {
      alert("period");
    } else {


      
      const postConfig =await configSelected == null || configSelected === undefined
          ? axios.post(`${OnRun}/marketing/fillter`, {
              access: access,
              title: config.title,
              config: { ...config.config, period: config.period },
            })
          : axios.post(`${OnRun}/marketing/editfillter`, {
              access: access,
              _id: configSelected,
              title: config.title,
              config: { ...config.config, period: config.period },
            });
            postConfig
            .then((response) => {
              if (response.data.reply === true) {
                setIsOpenFilter(false);
                if (configSelected == null) setConfigSelected(response.data.id);
                console.log(response.data);
              } else {
                toast.error(response.data.msg);
              }
            })
            .catch((error) => toast.error(error.message));
    }
  };



  useEffect(() => {
    getConfig();
  }, [configSelected]);
  useEffect(getConfigList, []);
  useEffect(() => {
    setIsContextSelected(config.context);
  }, [config.context]);

  const handleDropdownToggle = (dropdownId) => {
    setOpenDropdown((prevDropdownId) =>
      prevDropdownId === dropdownId ? null : dropdownId
    );
  };



  return (
    <div
      dir="rtl"
      className="relative w-full min-h-screen bg-gray-100 p-6 overflow-hidden"
    >
      <ToastContainer />
      <Stepper activeStep={stepNumber}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {stepNumber === 0 && (
        <Grid container spacing={3}>
          <CardConfigMarketing
            profil={<GoPlus size={30} style={{ strokeWidth: 2 }} />}
            title={"جدید"}
            id={null}
            setConfigSelected={setConfigSelected}
            nextStep={nextStep}
          />
          {listConfig.map((i) => {
            const firstLetter = i.title.charAt(0);
            return (
              <CardConfigMarketing
                key={i._id}
                profil={<span>{firstLetter}</span>}
                title={i.title}
                id={i._id}
                data={i.date}
                status={i.status}
                setConfigSelected={setConfigSelected}
                nextStep={nextStep}
              />
            );
          })}
        </Grid>
      )}

      {stepNumber === 1 && <SendingOptions loading={loading} config={config} setConfig={setConfig}/>}
      {stepNumber === 2 && <RenderFilters handleDropdownToggle={handleDropdownToggle} openDropdown={openDropdown} config={config} setConfig={setConfig} access={access}/>}

      <div className="flex justify-between mt-4">
        <Button
          disabled={stepNumber === 0}
          onClick={backStep}
          variant="contained"
          color="primary"
        >
          قبلی
        </Button>
        <Button
          onClick={stepNumber === 2 ? () => PostData() : nextStep}
          variant="contained"
          color="primary"
        >
          {stepNumber === 2 ? "ایجاد" : "بعدی"}
        </Button>
      </div>
    </div>
  );
};

export default ModalFilter;
