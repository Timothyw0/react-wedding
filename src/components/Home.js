import React, { useState } from "react";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { englishTextHome, chineseTextHome } from "../assets/data/translations";
import { useSelector } from "react-redux";
import homePhoto from "../assets/images/home_photo.jpeg";
import divider from "../assets/images/divider.png";

const Home = () => {
  const language = useSelector((state) => state.language.language);

  let textLang;
  if (language === "En") textLang = englishTextHome;
  else if (language === "Zh") textLang = chineseTextHome;

  return (
    <section
      id="home"
      className="home-page"
      style={{
        backgroundImage: `url('${homePhoto}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ width: "50%", margin: "auto" }}>
        <Card variant="outlined" style={{ borderRadius: "30px" }}>
          <CardContent>
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
          </CardContent>
        </Card>
      </Box>
    </section>
  );
};

export default Home;
