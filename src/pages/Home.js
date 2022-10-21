import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { englishTextHome, chineseTextHome } from "../assets/data/translations";
import { useSelector } from "react-redux";
import homePhoto from "../assets/images/home_back.jpg";
import divider from "../assets/images/divider.png";
import back from "../assets/images/qa_back.jpeg";

const Home = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const language = useSelector((state) => state.language.language);

  let textLang;
  if (language === "En") textLang = englishTextHome;
  else if (language === "Zh") textLang = chineseTextHome;

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

  const textInfo = (space = false) => (
    <>
      <Typography variant="h3" style={{ fontFamily: "Fairplay Display" }}>
        {textLang.madeleine}
        {space && <br />} & {space && <br />}
        {textLang.tim}
      </Typography>
      <img
        src={divider}
        alt="Divider"
        style={{ width: "80%", padding: "15px" }}
      ></img>
      <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
        {textLang.date}
        <br />
        {textLang.location}
        <br />
        {textLang.city}
      </Typography>
    </>
  );

  const wideDisplay = (
    <div
      className="home-page"
      style={{
        backgroundImage: `url('${homePhoto}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box style={{ paddingTop: "50px" }}>
        <Card
          variant="elevated"
          style={{
            borderRadius: "30px",
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "rgba(255,255,255,0.7)",
          }}
        >
          <CardContent>{textInfo(false)}</CardContent>
        </Card>
      </Box>
    </div>
  );

  const mobileDisplay = (
    <div className="home-page">
      <img src={homePhoto} style={{ width: "100%" }} />
      <img src={back} style={{ width: "100%" }} />
      <Box style={{ paddingBottom: "100px" }}>{textInfo(true)}</Box>
    </div>
  );

  return isMobile ? mobileDisplay : wideDisplay;
};

export default Home;
