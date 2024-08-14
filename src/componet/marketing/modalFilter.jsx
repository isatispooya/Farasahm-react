import React, { useState, useEffect } from "react";
import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Grid,
  CircularProgress,
} from "@mui/material";
import CardConfigMarketing from "./CardConfigMarketing";
import SendingOptions from "./sendingOptions";
import RenderFilters from "./renderFilters";
import axios from "axios";
import { OnRun } from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoPlus } from "react-icons/go";
import { DateObject } from "react-multi-date-picker";
import MiniLoader from "../Loader/miniLoader";

const ModalFilter = ({
  access,
  configSelected,
  setConfigSelected,
  setIsContextSelected,
  setIsOpenFilter,
  config,
  setConfig,
  newconfig
}) => {


  const steps = ["لیست کارت ها ", " تنظیمات ارسال", "تنظیمات فیلتر"];
  const [stepNumber, setStepNumber] = useState(0);
  const [listConfig, setListConfig] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getConfigList = () => {
    axios
      .post(OnRun + "/marketing/marketinglist", {
        access: access,
      })
      .then((response) => {
        setListConfig(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const nextStep = () => stepNumber < 2 && setStepNumber(stepNumber + 1);
  const backStep = () => stepNumber > 0 && setStepNumber(stepNumber - 1);

  const getConfig = async () => {
    setLoading(true);

    try {
      if (configSelected) {
        const response = await axios.post(`${OnRun}/marketing/viewconfig`, {
          access: access,
          _id: configSelected,
        });
        if (response.data && response.data.config) {
          response.data.config["title"] = response.data["title"];
          setConfig(response.data.config);
          console.log(config);
        } else {
          console.error(response.error?.data?.message || "Unknown error");
        }
      } else {
        setConfig(newconfig);
      }
    } catch (error) {
      setStepNumber(0);
      toast.error("خطا در بارگزاری");
    } finally {
      setLoading(false);
    }
  };

  const PostData = async () => {
    setIsSubmitting(true);
    try {
      const postConfig =
        configSelected == null || configSelected == undefined
          ? axios.post(`${OnRun}/marketing/fillter`, {
              access: access,
              title: config.title,
              config: { ...config, period: config.period },
            })
          : axios.post(`${OnRun}/marketing/editfillter`, {
              access: access,
              _id: configSelected,
              title: config.title,
              config: config,
            });

      const response = await postConfig;

      if (response.data.reply === true) {
        setIsOpenFilter(false);

        if (configSelected == null) setConfigSelected(response.data.id);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("خطا در بارگزاری");
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkValue =
    config.title !== "" && config.send_time !== null && config.period !== null;

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
      <Stepper
        activeStep={stepNumber}
        className="bg-white p-4 rounded-lg shadow-md"
        alternativeLabel
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>
              <span
                className={`text-sm font-medium ${
                  stepNumber === index ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {label}
              </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {stepNumber === 0 && (
        <Grid container spacing={3} className="mt-6">
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
                send_time={i.time}
                period={i.period}
                data={i.date}
                status={i.status}
                setConfigSelected={setConfigSelected}
                nextStep={nextStep}
                setConfig={setConfig}
                getConfigList={getConfigList}
              />
            );
          })}
        </Grid>
      )}

      {stepNumber === 1 && (
        <SendingOptions
          loading={loading}
          config={config}
          setConfig={setConfig}
          getConfigList={getConfigList}
        />
      )}

      {isSubmitting ? (
        <MiniLoader />
      ) : (
        stepNumber === 2 && (
          <RenderFilters
            handleDropdownToggle={handleDropdownToggle}
            openDropdown={openDropdown}
            config={config}
            setConfig={setConfig}
            access={access}
          />
        )
      )}

      <div className="flex justify-between mt-8">
        <Button
          disabled={stepNumber === 0}
          onClick={backStep}
          variant="contained"
          color="primary"
          className="bg-blue-600 hover:bg-blue-700"
        >
          قبلی
        </Button>
        <Button
          onClick={stepNumber === 2 ? () => PostData() : nextStep}
          variant="contained"
          color="primary"
          className={`${
            !checkValue ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={!checkValue}
        >
          {isSubmitting && checkValue ? (
            <CircularProgress color="secondary" size={20} />
          ) : stepNumber === 2 ? (
            "ایجاد"
          ) : (
            "بعدی"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ModalFilter;
