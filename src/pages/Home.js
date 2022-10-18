import React, { useState } from "react";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { englishTextHome, chineseTextHome } from "../assets/data/translations";
import { useSelector } from "react-redux";
import homePhoto from "../assets/images/numerodos.jpg";
import divider from "../assets/images/divider.png";
import back from "../assets/images/qa_back.jpeg";
import { AnimationOnScroll } from "react-animation-on-scroll";

const Home = () => {
  const language = useSelector((state) => state.language.language);

  let textLang;
  if (language === "En") textLang = englishTextHome;
  else if (language === "Zh") textLang = chineseTextHome;

  return (
    <div className="home-page">
      <img src={homePhoto} style={{ width: "100%" }} />
      <div
        style={{
          backgroundImage: `url('${back}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
        }}
      >
        <Box style={{ paddingTop: "200px" }}>
          <Typography variant="h3" style={{ fontFamily: "Fairplay Display" }}>
            {textLang.madeleine}
            <br />& <br />
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
        </Box>
      </div>
    </div>
  );
};

export default Home;
