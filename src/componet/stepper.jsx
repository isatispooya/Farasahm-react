import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";
import ModalFilter from "./modalFilter";
import Title from "./title";
import { styled } from "@mui/system";

// Custom styles
const CustomStepper = styled(Stepper)(({ theme }) => ({
  backgroundColor: "transparent",
  padding: theme.spacing(3),
  "& .MuiStepLabel-label": {
    color: theme.palette.grey?.[600] || "#757575",
    "&.Mui-active": {
      fontWeight: "bold",
      color: theme.palette.primary?.main || "#1976d2",
    },
    "&.Mui-completed": {
      textDecoration: "line-through",
      color: theme.palette.primary?.light || "#64b5f6",
    },
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  padding: theme.spacing(1, 4),
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: theme.palette.primary?.dark || "#115293",
    transform: "scale(1.05)",
    transition: "all 0.3s ease-in-out",
  },
}));

const StepperSlide = ({ toggleModal }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "قدم 1: لیست‌ها",
    "قدم 2: مشاهده و ایجاد",
    "قدم 3: نهایی کردن",
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      toggleModal(); 
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1); 
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-80 backdrop-blur-sm"
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          mx: "auto",
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <CustomStepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </CustomStepper>

        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography variant="h6" align="center" gutterBottom>
                همه مراحل تکمیل شد - شما به پایان رسیدید!
              </Typography>
              <Box sx={{ textAlign: "center" }}>
                <CustomButton
                  onClick={handleReset}
                  variant="contained"
                  color="primary"
                >
                  تنظیم مجدد
                </CustomButton>
              </Box>
            </div>
          ) : (
            <div>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {activeStep === 0 ? (
                  <Title
                    listConfig={["لیست 1", "لیست 2", "لیست 3"]}
                    selectedItem={"لیست 1"}
                    handleDeleteItem={(item) => console.log(`Deleted: ${item}`)}
                    handleOptionClick={(item) => console.log(`Selected: ${item}`)}
                  />
                ) : activeStep === 1 ? (
                  <ModalFilter
                    onSubmit={handleNext}
                    access={access}
                    getDf={() => console.log("Data fetched and Modal closed")}
                  />
                ) : (
                  "گزینه‌های انتخاب شده را بررسی کنید و برای ارسال روی اتمام کلیک کنید"
                )}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pt: 2,
                  justifyContent: "space-between",
                }}
              >
                <CustomButton
                  color="inherit"
                  onClick={handleBack}
                  variant="outlined"
                >
                  {activeStep === 0 ? "بستن" : "بازگشت"}
                </CustomButton>
                <CustomButton
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                >
                  {activeStep === steps.length - 1 ? "اتمام" : "مرحله بعد"}
                </CustomButton>
              </Box>
            </div>
          )}
        </div>
      </Box>
    </div>
  );
};

export default StepperSlide;




