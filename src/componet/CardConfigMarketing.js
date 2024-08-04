import React from "react";
import { Avatar, Button, Card, CardActions, CardHeader, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          textAlign: "right",
          borderRadius: 12,  // Rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",  // Shadow for card
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 56,
          height: 56,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,  
        },
      },
    },
  },
});

const CardConfigMarketing = ({ profil, title, id, setConfigSelected }) => {
  return (
    <div dir="rtl">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Card sx={{ maxWidth: 345, margin: 2, padding: 2 }}>
          <CardHeader
            avatar={<Avatar>{profil}</Avatar>}
            title={<Typography variant="h6">{title}</Typography>}
            sx={{
              textAlign: "left",
              "& .MuiCardHeader-root": {
                display: 'flex',
                alignItems: 'center',
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
            <Button variant="outlined" color="error">
              حذف
            </Button>
          </CardActions>
        </Card>
      </ThemeProvider>
    </div>
  );
};

export default CardConfigMarketing;
