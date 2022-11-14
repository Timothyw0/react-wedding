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
  gallery9,
  gallery10,
  gallery11,
  gallery12,
  gallery13,
  gallery14,
  gallery15,
  gallery16,
  gallery17,
  gallery18,
  gallery19,
  gallery20,
  gallery21,
  gallery22,
  gallery23,
  gallery24,
  gallery26,
  gallery27,
  gallery28,
  gallery29,
  gallery30,
  gallery31,
  gallery32,
  gallery33,
  gallery34,
} from "../assets/images/gallery";
import "./AboutUs.css";

function AboutUs() {
  const [width, setWidth] = useState(window.innerWidth);
  const language = useSelector((state) => state.language.language);

  const orientation = {
    wide: { height: 3, width: 4 },
    tall: { height: 4, width: 3 },
    ultrawide: { height: 3, width: 5 },
  };
  const wides = new Set([7, 8, 13, 15]);
  const ultraWides = new Set([28, 29, 32]);
  const order = [
    1, 2, 23, 4, 30, 6, 7, 8, 9, 26, 11, 12, 32, 14, 19, 16, 17, 21, 15, 20, 18,
    22, 3, 24, 10, 27, 28, 29, 5, 31, 13, 33, 34,
  ];
  const picMapping = {
    1: gallery1,
    2: gallery2,
    3: gallery3,
    4: gallery4,
    5: gallery5,
    6: gallery6,
    7: gallery7,
    8: gallery8,
    9: gallery9,
    10: gallery10,
    11: gallery11,
    12: gallery12,
    13: gallery13,
    14: gallery14,
    15: gallery15,
    16: gallery16,
    17: gallery17,
    18: gallery18,
    19: gallery19,
    20: gallery20,
    21: gallery21,
    22: gallery22,
    23: gallery23,
    24: gallery24,
    26: gallery26,
    27: gallery27,
    28: gallery28,
    29: gallery29,
    30: gallery30,
    31: gallery31,
    32: gallery32,
    33: gallery33,
    34: gallery34,
  };

  const images = order.map((pic) => {
    return {
      src: picMapping[pic],
      height: wides.has(pic)
        ? orientation.wide.height
        : ultraWides.has(pic)
        ? orientation.ultrawide.height
        : orientation.tall.height,
      width: wides.has(pic)
        ? orientation.wide.width
        : ultraWides.has(pic)
        ? orientation.ultrawide.width
        : orientation.tall.width,
    };
  });

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
            <img src={us1} className="about-img" alt="Our first picture"></img>
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
