import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Stack,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const ModalAdvancedFilter = ({ open, handleClose }) => {
  const save = () => {
    alert("سیو شد انصرافو بزن برو");
  };

  const switchLabel = [
    "نام و نام خانوادگی ",
    "کد ملی",
    "نام شرکت",
    "شماره شناسنامه",
    "کد بورسی",
    "درصد",
  ];

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          id="modal-title"
          variant="h5"
          component="h5"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          فیلتر پیشرفته
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 15,
            mb: 4,
          }}
          id="modal-description"
        >
          حذف موارد تکراری از جدول
        </Typography>

        <FormGroup
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {switchLabel.map((label, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                width: "100%",
                justifyContent: "flex-end",
                px: 3,
                py: 1,
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} defaultChecked={false} />}
                label={label}
                sx={{
                  fontSize: 14,
                  textAlign: "right",
                  flexGrow: 1,
                  color: "text.primary",
                }}
              />
            </Stack>
          ))}
        </FormGroup>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mt: 4,
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              borderRadius: 3,
              px: 4,
              py: 1,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "primary.light",
                borderColor: "primary.dark",
              },
            }}
          >
            انصراف
          </Button>
          <Button
            variant="contained"
            onClick={save}
            sx={{
              backgroundColor: "primary.main",
              borderRadius: 3,
              px: 4,
              py: 1,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            اعمال فیلتر
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAdvancedFilter;
