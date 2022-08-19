import * as React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { englishTextDial, chineseTextDial } from "../assets/data/translations";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import SmsIcon from "@mui/icons-material/Sms";

const Speeddial = () => {
  const language = useSelector((state) => state.language.language);

  let textLang;
  if (language === "En") textLang = englishTextDial;
  else if (language === "Zh") textLang = chineseTextDial;

  const actions = [
    { icon: <EmailIcon />, name: textLang.email },
    { icon: <SmsIcon />, name: textLang.text },
    { icon: <GitHubIcon />, name: textLang.code },
  ];

  const dialAction = (e, type) => {
    e.preventDefault();
    switch (type) {
      case "Email Us":
      case "电子邮箱":
        window.location.href = "mailto:timothyw0@gmail.com";
        break;
      case "Text Us":
      case "短信":
        window.location.href = "sms://+17329393051";
        break;
      case "Check Out My Code!":
      case "我的代码!":
        window.open("https://github.com/Timothyw0/react-wedding", "_blank");
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
