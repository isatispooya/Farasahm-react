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
  Container,
  CardContent,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AccessContext } from "../config/accessContext";
import { OnRun } from "../config/config";
import { deepOrange, deepPurple, blue, green, red } from "@mui/material/colors";

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
      window.location.reload();

      if (response.ok) {
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
      console.error("خطا در درخواست حذف:", error);
    }
  };

  const getRandomColor = () => {
    const colors = [
      "#FF5722", // Deep Orange 500
      "#673AB7", // Deep Purple 500
      "#2196F3", // Blue 500
      "#4CAF50", // Green 500
      "#F44336", // Red 500
      "#FFC107", // Amber 500
      "#9C27B0", // Purple 500
      "#03A9F4", // Light Blue 500
      "#8BC34A", // Lime 500
      "#FF9800", // Orange 500
      "#3F51B5", // Indigo 500
      "#E91E63", // Pink 500
      "#CDDC39", // Lime 500
      "#009688", // Teal 500
      "#FFEB3B", // Yellow 500
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid item>
        <Card sx={{ minWidth: 350, margin: 2, padding: 2 }}>
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
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {title}
              </Typography>
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
            <Typography>{data}</Typography>
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
