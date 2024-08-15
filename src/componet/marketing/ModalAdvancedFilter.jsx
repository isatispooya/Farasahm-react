import React, { useEffect, useState } from "react";
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
import { OnRun } from "../../config/config";
import axios from "axios";
import MicroLoader from "../Loader/microLoader";
import { toast } from "react-toastify";

const ModalAdvancedFilter = ({
  open,
  handleClose,
  access,
  configSelected,
  setConfig,
  config,
  get,
}) => {
  const [switchLabelList, setSwitchLabelList] = useState([]);
  const [loadingDf, setLoadingDf] = useState(true);

  useEffect(() => {
    getAdvancedFilter();
  }, []);

  const save = () => {
    const selectedLabels = switchLabelList.filter((label, index) => {
      const switchElement = document.getElementById(`switch-${index}`);
      return switchElement && switchElement.checked;
    });
    const updatedConfig = {
      ...config,
      duplicate: selectedLabels,
    };
    setConfig(updatedConfig);
    postEditFilter(updatedConfig);
    get();
    handleClose();
  };

  const getAdvancedFilter = () => {
    const options = {
      method: "POST",
      url: `${OnRun}/marketing/columnmarketing`,
      headers: { "content-type": "application/json" },
      data: { access: access, _id: configSelected },
    };
    axios
      .request(options)
      .then((response) => {
        setSwitchLabelList(response.data.columns);
        
        
        setLoadingDf(false);
      })
      .catch((error) => {
        setLoadingDf(false);
        console.error(error.message);
      });
  };

  const postEditFilter = (updatedConfig) => {
    const options = {
      method: "POST",
      url: `${OnRun}/marketing/editfillter`,
      headers: { "content-type": "application/json" },
      data: {
        access: access,
        title: updatedConfig.title,
        config: updatedConfig,
        _id: configSelected,
      },
    };

    axios
      .request(options)
      .then((response) => {
        toast(response.data.message);
        setConfig(updatedConfig);
        get();
      })
      .catch((error) => {
        console.error("Error sending the request:", error.message);
        toast(error.message);
      });
  };

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

        {loadingDf ? (
          <MicroLoader loading={true} />
        ) : (
          <FormGroup
            sx={{
              direction: "ltr",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: 2,
              maxHeight: "440px",
              overflowX: "auto",
              overflowY: "scroll",
            }}
          >
            {switchLabelList &&
              switchLabelList.map((label, index) => {
                const isChecked = config.duplicate.includes(label);
                return (
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
                      control={
                        <IOSSwitch
                          id={`switch-${index}`}
                          sx={{ m: 1 }}
                          defaultChecked={isChecked}
                        />
                      }
                      label={label.replace("{{", "").replace("}}", "")}
                      sx={{
                        fontSize: 14,
                        textAlign: "right",
                        flexGrow: 1,
                        color: "text.primary",
                      }}
                    />
                  </Stack>
                );
              })}
          </FormGroup>
        )}

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
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAdvancedFilter;
