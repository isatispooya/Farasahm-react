import { Avatar, Button, Card, CardActions, CardHeader } from "@mui/material";

const CardConfigMarketing = ({ profil, title, id, setConfig }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
      avatar={
        <Avatar>{profil}</Avatar>
      }
      title={title}

      >

      </CardHeader>
      <CardActions>
        <Button>
            حذف
        </Button>
        
      </CardActions>
    </Card>
  );
};


export default CardConfigMarketing