import { Grid, Typography } from "@material-ui/core";
import { Box, Card, CardContent } from "@material-ui/core";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  englishTextParty,
  chineseTextParty,
} from "../assets/data/translations";
import back from "../assets/images/qa_back.jpeg";
import divider from "../assets/images/divider.png";
import manPhoto from "../assets/images/man.jpeg";
import spencer from "../assets/images/spencer2.png";
import sarah from "../assets/images/party/sarah.jpeg";
import donny from "../assets/images/party/donny.jpeg";
import emily from "../assets/images/party/emily.jpeg";
import kim from "../assets/images/party/kim.jpeg";
import marian from "../assets/images/party/marian.jpeg";
import michele from "../assets/images/party/michele.jpeg";
import bridget from "../assets/images/party/bridget.jpeg";
import womanPhoto from "../assets/images/woman.jpeg";
import "./Party.css";

function Party() {
  const [width, setWidth] = useState(window.innerWidth);
  const language = useSelector((state) => state.language.language);

  let textLang;
  if (language === "En") textLang = englishTextParty;
  else if (language === "Zh") textLang = chineseTextParty;

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

  let partyInfo = (
    <>
      <header className="party-header">
        <Typography variant="h2" style={{ fontFamily: "Fairplay Display" }}>
          {textLang.party}
        </Typography>
        <img
          src={divider}
          alt="Divider"
          style={{ width: "20%", padding: "15px" }}
        ></img>
      </header>
      <div className="party-grid">
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 1, md: 1 }}
          style={{ width: isMobile ? "90%" : "70%", margin: "auto" }}
        >
          {/* Row 1 */}
          <Grid item xs={6}>
            <img src={spencer} className="party-img" alt="spencer"></img>
            <Typography variant="h4" style={{ fontFamily: "Fairplay Display" }}>
              Karl Odell
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.bestman}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <img src={michele} className="party-img" alt="blank"></img>
            <Typography
              variant="h4"
              style={{ fontFamily: "Fairplay Display" }}
              className="person-text"
            >
              Michele Katz
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.moh}
            </Typography>
          </Grid>
          {/* Row 2 */}
          <Grid item xs={6}>
            <img src={manPhoto} className="party-img" alt="blank"></img>
            <Typography variant="h4" style={{ fontFamily: "Fairplay Display" }}>
              Stephen Signorelli
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              Boop
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <img src={sarah} className="party-img" alt="blank"></img>
            <Typography
              variant="h4"
              style={{ fontFamily: "Fairplay Display" }}
              className="person-text"
            >
              Sarah Clements
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              Boop
            </Typography>
          </Grid>
          {/* Row 3 */}
          <Grid item xs={6}>
            <img src={manPhoto} className="party-img" alt="blank"></img>
            <Typography variant="h4" style={{ fontFamily: "Fairplay Display" }}>
              Brrap Brrap 1
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              Boop
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <img src={kim} className="party-img" alt="blank"></img>
            <Typography
              variant="h4"
              style={{ fontFamily: "Fairplay Display" }}
              className="person-text"
            >
              Kimberly Coscette
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.kim}
            </Typography>
          </Grid>
          {/* Row 4 */}
          <Grid item xs={6}>
            <img src={manPhoto} className="party-img" alt="blank"></img>
            <Typography variant="h4" style={{ fontFamily: "Fairplay Display" }}>
              Brrap Brrap 1
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              Boop
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <img src={emily} className="party-img" alt="blank"></img>
            <Typography
              variant="h4"
              style={{ fontFamily: "Fairplay Display" }}
              className="person-text"
            >
              Emily Herring
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.emily}
            </Typography>
          </Grid>
          {/* Row 5 */}
          <Grid item xs={6}>
            <img src={manPhoto} className="party-img" alt="blank"></img>
            <Typography variant="h4" style={{ fontFamily: "Fairplay Display" }}>
              Ahh
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              Boop
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <img src={womanPhoto} className="party-img" alt="blank"></img>
            <Typography
              variant="h4"
              style={{ fontFamily: "Fairplay Display" }}
              className="person-text"
            >
              Theresa Wang
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.theresa}
            </Typography>
          </Grid>
          {/* Row 6 */}
          <Grid item xs={6}>
            <img src={donny} className="party-img" alt="blank"></img>
            <Typography variant="h4" style={{ fontFamily: "Fairplay Display" }}>
              Donny Herring
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.donny}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <img src={bridget} className="party-img" alt="blank"></img>
            <Typography
              variant="h4"
              style={{ fontFamily: "Fairplay Display" }}
              className="person-text"
            >
              Bridget King
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.bridesmaid}
            </Typography>
          </Grid>
          {/* Row 7 */}
          <Grid item xs={6}>
            <img src={manPhoto} className="party-img" alt="blank"></img>
            <Typography variant="h4" style={{ fontFamily: "Fairplay Display" }}>
              Thomas Maguire
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.groomsman}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <img src={marian} className="party-img" alt="blank"></img>
            <Typography
              variant="h4"
              style={{ fontFamily: "Fairplay Display" }}
              className="person-text"
            >
              Marian Peters
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.bridesmaid}
            </Typography>
          </Grid>
          {/* Row 8 */}
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <img src={womanPhoto} className="party-img" alt="blank"></img>
            <Typography
              variant="h4"
              style={{ fontFamily: "Fairplay Display" }}
              className="person-text"
            >
              Jessica MacPherson
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.bridesmaid}
            </Typography>
          </Grid>
          {/* Row 9 */}
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <img src={womanPhoto} className="party-img" alt="blank"></img>
            <Typography
              variant="h4"
              style={{ fontFamily: "Fairplay Display" }}
              className="person-text"
            >
              Pamela Pulla
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.bridesmaid}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );

  return (
    <div
      className="party-div"
      style={{
        backgroundImage: `url(${back})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
        paddingBottom: "100px",
      }}
    >
      {isMobile ? (
        partyInfo
      ) : (
        <Box sx={{ width: "70%", margin: "auto" }} className="rsvp-box">
          <Card
            className="rsvp-card"
            variant="outlined"
            style={{ alignItems: "center", display: "flex" }}
          >
            <CardContent style={{ margin: "auto" }}>{partyInfo}</CardContent>
          </Card>
        </Box>
      )}
    </div>
  );
}

export default Party;
