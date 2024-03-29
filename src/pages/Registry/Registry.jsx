import React, { memo, useEffect, useState } from "react";
import { Box, Card, CardContent } from "@material-ui/core";
import back from "../../assets/images/qa_back.jpeg";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./Registry.css";
import { useLanguageSelector } from "../../hooks/useLanguageSelector";

const Registry = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { textLang } = useLanguageSelector("registry");

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  let textContent = (
    <>
      <h1>{textLang.header}</h1>
      <br />
      <br />
      <a
        href={textLang.registryURL}
        target="_blank"
        style={{ fontSize: "x-large" }}
      >
        {textLang.registryText} <OpenInNewIcon />
      </a>
    </>
  );

  return (
    <div
      className="registry-div"
      style={{
        backgroundImage: `url('${back}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
      }}
    >
      {isMobile ? (
        textContent
      ) : (
        <Box sx={{ width: "80%", margin: "auto" }} className="registry-box">
          <Card
            className="rsvp-card"
            variant="outlined"
            style={{ alignItems: "center", display: "flex", height: "40vh" }}
          >
            <CardContent style={{ margin: "auto" }}>{textContent}</CardContent>
          </Card>
        </Box>
      )}
    </div>
  );
};

export default memo(Registry);
