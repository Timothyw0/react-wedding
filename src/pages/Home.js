import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { englishTextHome, chineseTextHome } from "../assets/data/translations";
import { useSelector } from "react-redux";
import homePhoto from "../assets/images/home_back.jpg";
import divider from "../assets/images/divider.png";
import back from "../assets/images/qa_back.jpeg";
import cardBack from "../assets/images/card_back.jpeg";

const Home = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [daysTill, setDaysTill] = useState(undefined);
  const language = useSelector((state) => state.language.language);

  let textLang;
  if (language === "En") textLang = englishTextHome;
  else if (language === "Zh") textLang = chineseTextHome;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    const oneDay = 1000 * 60 * 60 * 24;
    const dayDiff = new Date(2023, 8, 23) - new Date();
    setDaysTill(Math.ceil(dayDiff / oneDay));
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
        {textLang.city}
      </Typography>
      <Grid container alignContent="center" justifyContent="center">
        <Grid item xs={12} style={{ marginTop: 50 }}>
          <Card
            style={{
              width: "200px",
              height: "150px",
              margin: "auto",
              padding: 3,
              borderRadius: 0,
            }}
          >
            <div
              style={{
                backgroundImage: `url(${cardBack})`,
                backgroundSize: "200px 150px",
                height: "100%",
                verticalAlign: "middle",
                textAlign: "center",
                display: "flex",
              }}
            >
              <p style={{ fontSize: "30px", margin: "auto", width: "90%" }}>
                {daysTill || ""}
                <br />
                {daysTill === 1 ? textLang.day : textLang.days}!
              </p>
            </div>
          </Card>
        </Grid>
      </Grid>
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
