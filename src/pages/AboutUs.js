import { Grid, Typography, Card, CardContent } from "@material-ui/core";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import {
  englishTextStory,
  chineseTextStory,
} from "../assets/data/translations";
import divider from "../assets/images/divider.png";
import us1 from "../assets/images/us.jpg";
import backPhoto from "../assets/images/travel_back.png";
import {
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
} from "../assets/images/gallery";
import "./AboutUs.css";

function AboutUs() {
  const [width, setWidth] = useState(window.innerWidth);
  const language = useSelector((state) => state.language.language);

  const images = [
    {
      src: gallery1,
      height: 4,
      width: 3,
    },
    {
      src: gallery2,
      height: 4,
      width: 3,
    },
    {
      src: gallery3,
      height: 4,
      width: 3,
    },
    {
      src: gallery4,
      height: 4,
      width: 3,
    },
    {
      src: gallery5,
      height: 4,
      width: 3,
    },
    {
      src: gallery6,
      height: 4,
      width: 3,
    },
    {
      src: gallery7,
      height: 3,
      width: 4,
    },
    {
      src: gallery8,
      height: 3,
      width: 4,
    },
  ];

  let textLang;
  if (language === "En") textLang = englishTextStory;
  else if (language === "Zh") textLang = chineseTextStory;

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

  return (
    <div
      className="about-div"
      style={{
        backgroundImage: `url(${backPhoto})`,
        backgroundSize: "cover",
      }}
    >
      <header className="about-header">
        <Typography variant="h2" style={{ fontFamily: "Fairplay Display" }}>
          {textLang.header}
        </Typography>
        <img
          src={divider}
          alt="Divider"
          style={{ width: "20%", padding: "15px" }}
        ></img>
      </header>
      <div className="img-div">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={3}>
            <img src={us1} className="about-img" alt="us before"></img>
          </Grid>
          <Grid item xs={12} md={3}>
            <img src={us1} className="about-img" alt="madeleine"></img>
          </Grid>
        </Grid>
      </div>
      <div className="story-div">
        <Typography
          variant="h4"
          style={{
            fontFamily: "Fairplay Display",
            wordWrap: "break-word",
            textAlign: "justify",
          }}
        >
          {textLang.story}
        </Typography>
      </div>
      <div className="gallery-div">
        <Gallery margin={2} images={images} enableImageSelection={false} />
      </div>
    </div>
  );
}

export default AboutUs;
