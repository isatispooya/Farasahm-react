import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Typography, Box } from "@mui/material";
import ModalFilter from "./modalFilter";
import { styled } from "@mui/system";

const CustomStepper = styled(Stepper)(({ theme }) => ({
  backgroundColor: "transparent",
  padding: theme.spacing(3),
  "& .MuiStepLabel-label": {
    fontSize: "1.25rem",
    color: theme.palette.grey[600] || "#757575",
    "&.Mui-active": {
      fontWeight: "bold",
      color: theme.palette.primary.main || "#1976d2",
    },
    "&.Mui-completed": {
      textDecoration: "line-through",
      color: theme.palette.primary.light || "#64b5f6",
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
    backgroundColor: theme.palette.primary.dark || "#115293",
    transform: "scale(1.05)",
    transition: "all 0.3s ease-in-out",
  },
}));

const StepperSlide = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["قدم 1: فیلتر داده ها", "مرحله 2: مشاهده و ایجاد"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
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
            <Typography variant="h5" align="center" gutterBottom>
              All steps completed - you're finished!
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <CustomButton onClick={handleReset} variant="contained" color="primary">
                Reset
              </CustomButton>
            </Box>
          </div>
        ) : (
          <div>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {activeStep === 0 ? (
                <ModalFilter
                  onSubmit={handleNext} // Proceed to the next step after modal submission
                  access={{}} // Pass the required access object
                  getDf={() => console.log("Data fetched and Modal closed")}
                />
              ) : (
                "گزینه های انتخاب شده را بررسی کنید و برای ارسال روی اتمام کلیک کنید"
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
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                بازگشت
              </CustomButton>
              <CustomButton
                onClick={handleNext}
                variant="contained"
                color="primary"
              >
                {activeStep === steps.length - 1 ? "اتمام" : "مرحله بعد "}
              </CustomButton>
            </Box>
          </div>
        )}
      </div>
    </Box>
  );
};

export default StepperSlide;





