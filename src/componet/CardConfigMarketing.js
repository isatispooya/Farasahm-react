import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  CardContent,
  Chip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AccessContext } from "../config/accessContext";
import { OnRun } from "../config/config";
import { MdOutlineClose } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          textAlign: "center",
          borderRadius: 16,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 16px 30px rgba(0, 0, 0, 0.3)",
            transform: "translateY(-5px)",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 64,
          height: 64,
          fontSize: "28px",
          fontWeight: "700",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 25px",
        },
        containedPrimary: {
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        },
        outlinedError: {
          borderColor: "#d32f2f",
          "&:hover": {
            borderColor: "#b71c1c",
            backgroundColor: "#ffebee",
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: "#e3f2fd",
          color: "#42a5f5",
          textAlign: "center",
          fontWeight: "bold",
          borderRadius: 8,
          padding: "16px 24px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "8px 16px",
          justifyContent: "center",
        },
      },
    },
  },
});

const getRandomColor = () => {
  const colors = [
    "#FF5722",
    "#673AB7",
    "#2196F3",
    "#4CAF50",
    "#F44336",
    "#FFC107",
    "#9C27B0",
    "#03A9F4",
    "#8BC34A",
    "#FF9800",
    "#3F51B5",
    "#E91E63",
    "#CDDC39",
    "#009688",
    "#FFEB3B",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getPeriodLabel = (period) => {
  const periodLabels = {
    once: "یکبار",
    daily: "روزانه",
    weekly: "هفتگی",
    monthly: "ماهانه",
  };
  return periodLabels[period] || "نامشخص";
};

const CardConfigMarketing = ({
  profil,
  status,
  data,
  title,
  period,
  id,
  send_time,
  setConfig,
  nextStep,
  setConfigSelected,
}) => {
  const access = useContext(AccessContext);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = () => setOpenDialog(true);
  const handleSelect = () => {
    nextStep();
    setConfigSelected(id);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${OnRun}/marketing/deleteconfig`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access, _id: id }),
      });

      if (response.ok) {
        setConfig((prevConfig) => {
          if (Array.isArray(prevConfig)) {
            return prevConfig.filter((config) => config.id !== id);
          }
          console.error("prevConfig is not an array");
          return [];
        });
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error deleting config:", errorData);
      }
    } catch (error) {
      console.error("Error deleting request:", error);
    } finally {
      setOpenDialog(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid item>
        <Card
          sx={{
            minWidth: 300,
            maxWidth: 300,
            margin: 2,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: 400,
            position: "relative",
            cursor: title === "جدید" ? "pointer" : "default",
          }}
          onClick={title === "جدید" ? handleSelect : undefined}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              paddingBottom: 0,
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{
                backgroundColor: getRandomColor(),
                marginBottom: 2,
                width: title === "جدید" ? 80 : 64,
                height: title === "جدید" ? 80 : 64,
                fontSize: title === "جدید" ? "30px" : "28px",
                fontWeight: "700",
                cursor: title === "جدید" ? "pointer" : "default",
              }}
            >
              {profil}
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: 2,
                color: "#333",
                fontSize: title === "جدید" ? "28px" : "23px",
              }}
            >
              {title}
            </Typography>
            {title !== "جدید" && (
              <>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  تاریخ و ساعت ارسال:
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "600",
                      ml: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {send_time}
                    {"-"}
                    {data}
                  </Typography>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  دوره ارسال:
                  <Typography
                    component="span"
                    sx={{ fontWeight: "600", ml: 1 }}
                  >
                    {getPeriodLabel(period)}
                  </Typography>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  وضعیت:
                  <Chip
                    icon={
                      status ? (
                        <IoCheckmarkSharp
                          style={{ color: "green", fontSize: "20px" }}
                        />
                      ) : (
                        <MdOutlineClose
                          style={{ color: "red", fontSize: "20px" }}
                        />
                      )
                    }
                    label={status ? "فعال" : "غیرفعال"}
                    sx={{ fontWeight: "600", ml: 1 }}
                  />
                </Typography>
              </>
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: "center", gap: 1, paddingTop: 2 }}>
            {title !== "جدید" && (
              <>
                <Button onClick={handleSelect} variant="contained">
                  انتخاب
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteClick}
                >
                  حذف
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>تأیید حذف</DialogTitle>
        <DialogContent>
          <Typography>
            آیا مطمئن هستید که می‌خواهید این کانفیگ را حذف کنید؟
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            انصراف
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            تأیید
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default CardConfigMarketing;
