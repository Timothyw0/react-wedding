import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import SmsIcon from "@mui/icons-material/Sms";

const actions = [
  { icon: <EmailIcon />, name: "Email Us" },
  { icon: <SmsIcon />, name: "Text Us" },
  { icon: <GitHubIcon />, name: "Check Out My Code!" },
];

const Speeddial = () => {
  const dialAction = (e, type) => {
    e.preventDefault();
    switch (type) {
      case "Email Us":
        window.location.href = "mailto:timothyw0@gmail.com";
        break;
      case "Text Us":
        window.location.href = "sms://+17329393051";
        break;
      case "Check Out My Code!":
        window.location.href = "https://github.com/Timothyw0/react-wedding";
        break;
      default:
        break;
    }
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "fixed", bottom: 50, right: 50 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={(e) => dialAction(e, action.name)}
        />
      ))}
    </SpeedDial>
  );
};

export default Speeddial;