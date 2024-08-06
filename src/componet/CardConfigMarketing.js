import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  CardContent,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AccessContext } from "../config/accessContext";
import { OnRun } from "../config/config";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          textAlign: "right",
          borderRadius: 16,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 16px 30px rgba(0, 0, 0, 0.3)",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 60,
          height: 60,
          color: "#fff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
        },
      },
    },
  },
});

const CardConfigMarketing = ({
  profil,
  status,
  data,
  title,
  id,
  setConfig,
  nextStep,
  setConfigSelected,
  isFirst,
}) => {
  const access = useContext(AccessContext);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleSelect = () => {
    
    nextStep();
    setConfigSelected(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${OnRun}/marketing/deleteconfig`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access: access,
          _id: id,
        }),
      });
      setOpenDialog(false);
  
      if (response.ok) {
        // بروزرسانی وضعیت بدون ریلود صفحه
        setConfig((prevConfig) => {
          if (Array.isArray(prevConfig)) {
            const updatedConfig = prevConfig.filter(
              (config) => config.id !== id
            );
            return updatedConfig;
          } else {
            console.error("prevConfig is not an array");
            return [];
          }
        });
      } else {
        const errorData = await response.json();
        console.error("Error deleting config:", errorData);
      }
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };
  

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
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid item>
        <Card
          sx={{
            minWidth: 480,
            maxWidth: 480,
            margin: 2,
            padding: 2,
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                style={{
                  backgroundColor: getRandomColor(),
                  fontSize: "23px",
                  fontWeight: "700",
                }}
              >
                {profil}
              </Avatar>
            }
            title={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {title !== "جدید" &&
                  (status ? (
                    <FaRegCircleCheck
                      size={24}
                      style={{ color: "green", marginRight: 8 }}
                    />
                  ) : (
                    <IoCloseCircleOutline
                      size={24}
                      style={{ color: "red", marginRight: 8 }}
                    />
                  ))}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {title}
                </Typography>
              </div>
            }
            sx={{
              textAlign: "left",
              "& .MuiCardHeader-root": {
                display: "flex",
                alignItems: "center",
                padding: 1,
              },
              "& .MuiCardHeader-title": {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginLeft: 2,
              },
              "& .MuiCardHeader-avatar": {
                marginLeft: 0,
              },
            }}
          />
          <CardContent>
            <Typography>
              {data}
            </Typography>
          </CardContent>

          <CardActions
            sx={{ justifyContent: "flex-end", gap: 2, paddingTop: 2 }}
          >
            <Button onClick={handleSelect} variant="contained" color="primary">
              انتخاب
            </Button>
            {title !== "جدید" && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteClick}
              >
                حذف
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          sx={{
            mb: 3,
            color: "#42a5f5",
            fontWeight: "bold",
            backgroundColor: "#e3f2fd",
            py: 1,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          تأیید حذف
        </DialogTitle>
        <DialogContent>
          <Typography>
            آیا مطمئن هستید که می‌خواهید این کانفیگ را حذف کنید؟
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            انصراف
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            تأیید
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default CardConfigMarketing;
