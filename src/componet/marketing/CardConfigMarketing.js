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
import { AccessContext } from "../../config/accessContext";
import { OnRun } from "../../config/config";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";


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
            transform: "translateY(-3px)",
            backgroundColor: "#f5f5f5",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 80,
          height: 80,
          fontSize: "32px",
          fontWeight: "700",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            transform: "scale(1.1)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 25px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          },
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
          color: "#42a5f5",
          textAlign: "center",
          fontWeight: "bold",
          borderRadius: 8,
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
  getConfigList,
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
      getConfigList() 
      if (response.ok) {
        setConfig((prevConfig) => {
          if (Array.isArray(prevConfig)) {
            return prevConfig.filter((config) => config.id !== id);
          }
          console.error("prevConfig is not an array");
          return [];
        });
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
            minWidth: 320,
            maxWidth: 320,
            margin: 2,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent:'center',
            alignItems: "center",
            height: 420,
            position: "relative",
            cursor: title === "جدید" ? "pointer" : "default",
            backgroundColor: title === "جدید" ? "#e3f2fd" : "#ffffff",
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
                backgroundColor:
                  title === "جدید" ? "#1e88e5" : getRandomColor(),
                marginBottom: 2,
                width: title === "جدید" ? 90 : 80,
                height: title === "جدید" ? 90 : 80,
                fontSize: title === "جدید" ? "38px" : "32px",
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
                <div className="flex">
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    وضعیت:
                  </Typography>
                  <Chip
                    icon={
                      status ? (
                        <FaRegCircleCheck 

                          style={{ color: "#4CAF50", fontSize: "15px" }}
                        />
                      ) : (
                        <IoCloseCircleOutline
                          style={{ color: "#D32F2F", fontSize: "20px" }}
                        />
                      )
                    }
                    label={status ? "فعال" : "غیرفعال"}
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      ml: 1,
                      bgcolor: status ? "#D7ECD9" : "#FFCDD2",
                      color: status ? "#4CAF50" : "#D32F2F",
                    }}
                  />
                </div>
              </>
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: "center", gap: 1, paddingTop: 2 }}>
            {title !== "جدید" && (
              <>
                <Button onClick={handleSelect} variant="contained">
                  انتخاب و ویرایش
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
