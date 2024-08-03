import React from "react";
import StepperSlide from "../componet/stepper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
        light: "#64b5f6",
        dark: "#115293",
      },
      grey: {
        600: "#757575",
      },
    },
  });

const Example = () => {
  return (
    <>
     <ThemeProvider theme={theme}>
     <StepperSlide />
     </ThemeProvider>
      
    </>
  );
};

export default Example;
