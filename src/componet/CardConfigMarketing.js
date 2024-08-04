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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AccessContext } from "../config/accessContext";
import { OnRun } from "../config/config";

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

const CardConfigMarketing = ({ profil, title, id, setConfig, index,setConfigSelected }) => {
  const access = useContext(AccessContext);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = () => {
    setOpenDialog(true);
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
          title: title,
        }),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setConfig((prevConfig) => {
          if (Array.isArray(prevConfig)) {
            return prevConfig.filter((config) => config.id !== id);
          } else {
            console.error("prevConfig is not an array");
            return [];
          }
        });
      } else {
        alert("خطا در حذف کانفیگ");
      }
      handleCloseDialog();
    } catch (error) {
      console.error("خطا در درخواست حذف:", error);
    }
  };


  return (
    <div dir="rtl">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Card sx={{ maxWidth: 360, margin: 2, padding: 2 }}>
          <CardHeader
            avatar={<Avatar>{profil}</Avatar>}
            title={<Typography variant="h6" sx={{ fontWeight: "bold" }}>{title}</Typography>}
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
          <CardActions sx={{ justifyContent: "flex-end", gap: 2, paddingTop: 2 }}>

<Button onClick={()=>setConfigSelected(id)} variant="contained" color="primary">انتخاب</Button>

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
    </div>
  );
};

export default CardConfigMarketing;

