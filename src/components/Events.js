import {
  Grid,
  Button,
  Divider,
  Typography,
  Box,
  Card,
  CardContent,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  englishTextEvents,
  chineseTextEvents,
} from "../assets/data/translations";
import divider from "../assets/images/divider.png";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import CelebrationIcon from "@mui/icons-material/Celebration";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import back from "../assets/images/qa_back.jpeg";
import manPhoto from "../assets/images/man.jpeg";
import womanPhoto from "../assets/images/woman.jpeg";
import "./Events.css";

function Events() {
  const [width, setWidth] = useState(window.innerWidth);
  const language = useSelector((state) => state.language.language);

  let textLang;
  if (language === "En") textLang = englishTextEvents;
  else if (language === "Zh") textLang = chineseTextEvents;

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

  let eventInfo = (
    <>
      <header className="events-header">
        <Typography variant="h2" style={{ fontFamily: "Fairplay Display" }}>
          {textLang.events}
        </Typography>
        <img
          src={divider}
          alt="Divider"
          style={{ width: "20%", padding: "15px" }}
        ></img>
      </header>
      <div className="event-grid">
        <Grid
          container
          rowSpacing={1}
          justifyContent="space-between"
          columnSpacing={{ xs: 1, sm: 1, md: 1 }}
          style={{ width: "90%", margin: "auto" }}
        >
          {/* FIRST ROW */}
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            direction="column"
            display="flex"
          >
            <Typography variant="h4" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.rehearsal} <br />
              {textLang.invite}
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Fairplay Display",
                fontSize: isMobile ? "small" : "large",
              }}
            >
              {textLang.rehearsalDate}
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Fairplay Display",
                fontSize: isMobile ? "small" : "large",
              }}
            >
              6:00 PM
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            direction="column"
            display="flex"
          >
            <RestaurantIcon style={{ margin: "auto", fontSize: "50" }} />
            <Typography
              variant={isMobile ? "body2" : "h6"}
              style={{ fontFamily: "Fairplay Display", margin: "auto" }}
              className="person-text"
            >
              Villa Barolo <br />
              1373 Easton Rd <br />
              Warrington, PA 18976
            </Typography>
            <br />
            <Button
              variant="outlined"
              style={{
                width: "80%",
                margin: "auto",
                textTransform: "none",
                fontSize: "small",
              }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/Villa+Barolo/@40.250902,-75.132658,15z/data=!4m2!3m1!1s0x0:0xfac0ecdef8378a97?sa=X&ved=2ahUKEwj_6NvYitH5AhXZkokEHaDDDVkQ_BJ6BAhKEAU",
                  "_blank"
                )
              }
            >
              {textLang.viewMap} <OpenInNewIcon fontSize="x-small" />
            </Button>
          </Grid>
          {/* SECOND ROW */}
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            direction="column"
            display="flex"
          >
            <Typography variant="h4" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.ceremony}
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Fairplay Display",
                fontSize: isMobile ? "small" : "large",
              }}
            >
              {textLang.ceremonyDate}
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Fairplay Display",
                fontSize: isMobile ? "small" : "large",
              }}
            >
              4:30 PM
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontFamily: "Fairplay Display",
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: isMobile ? "small" : "large",
                fontWeight: "bold",
              }}
            >
              {textLang.ceremonyArrive}
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            direction="column"
            display="flex"
          >
            <FilterVintageIcon style={{ margin: "auto", fontSize: "50" }} />
            <Typography
              variant={isMobile ? "body2" : "h6"}
              style={{ fontFamily: "Fairplay Display", margin: "auto" }}
              className="person-text"
            >
              The Warrington Country Club
              <br />
              1360 Almshouse Rd #1207
              <br />
              Warrington, PA 18976
            </Typography>
            <br />
            <Button
              variant="outlined"
              style={{
                width: "80%",
                margin: "auto",
                textTransform: "none",
                fontSize: "small",
              }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/The+Warrington/@40.2683806,-75.1281754,17z/data=!3m2!4b1!5s0x89c6a8f3dce9eea3:0xf44a9967886d3977!4m5!3m4!1s0x89c6a8f08df21f5f:0xda963dae31f39ab9!8m2!3d40.2683806!4d-75.1259867",
                  "_blank"
                )
              }
            >
              {textLang.viewMap} <OpenInNewIcon fontSize="x-small" />
            </Button>
          </Grid>
          {/* THIRD ROW */}
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            direction="column"
            display="flex"
          >
            <Typography variant="h4" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.cocktail}
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Fairplay Display",
                fontSize: isMobile ? "small" : "large",
              }}
            >
              {textLang.ceremonyDate}
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Fairplay Display",
                fontSize: isMobile ? "small" : "large",
              }}
            >
              5:00 PM
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            direction="column"
            display="flex"
          >
            <LocalBarIcon style={{ margin: "auto", fontSize: "50" }} />
            <Typography
              variant={isMobile ? "body2" : "h6"}
              style={{ fontFamily: "Fairplay Display", margin: "auto" }}
              className="person-text"
            >
              The Warrington Country Club
              <br />
              1360 Almshouse Rd #1207
              <br />
              Warrington, PA 18976
            </Typography>
            <br />
            <Button
              variant="outlined"
              style={{
                width: "80%",
                margin: "auto",
                textTransform: "none",
                fontSize: "small",
              }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/The+Warrington/@40.2683806,-75.1281754,17z/data=!3m2!4b1!5s0x89c6a8f3dce9eea3:0xf44a9967886d3977!4m5!3m4!1s0x89c6a8f08df21f5f:0xda963dae31f39ab9!8m2!3d40.2683806!4d-75.1259867",
                  "_blank"
                )
              }
            >
              {textLang.viewMap} <OpenInNewIcon fontSize="x-small" />
            </Button>
          </Grid>
          {/* FOURTH ROW */}
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            direction="column"
            display="flex"
          >
            <Typography variant="h4" style={{ fontFamily: "Fairplay Display" }}>
              {textLang.reception}
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Fairplay Display",
                fontSize: isMobile ? "small" : "large",
              }}
            >
              {textLang.ceremonyDate}
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Fairplay Display",
                fontSize: isMobile ? "small" : "large",
              }}
            >
              6:00 PM - 11:00 PM
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            direction="column"
            display="flex"
          >
            <CelebrationIcon style={{ margin: "auto", fontSize: "50" }} />
            <Typography
              variant={isMobile ? "body2" : "h6"}
              style={{ fontFamily: "Fairplay Display", margin: "auto" }}
              className="person-text"
            >
              The Warrington Country Club
              <br />
              1360 Almshouse Rd #1207
              <br />
              Warrington, PA 18976
            </Typography>
            <br />
            <Button
              variant="outlined"
              style={{
                width: "80%",
                margin: "auto",
                textTransform: "none",
                fontSize: "small",
              }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/The+Warrington/@40.2683806,-75.1281754,17z/data=!3m2!4b1!5s0x89c6a8f3dce9eea3:0xf44a9967886d3977!4m5!3m4!1s0x89c6a8f08df21f5f:0xda963dae31f39ab9!8m2!3d40.2683806!4d-75.1259867",
                  "_blank"
                )
              }
            >
              {textLang.viewMap} <OpenInNewIcon fontSize="x-small" />
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );

  return (
    <div
      className="events-div"
      style={{
        backgroundImage: `url('${back}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
      }}
    >
      {isMobile ? (
        eventInfo
      ) : (
        <Box sx={{ width: "80%", margin: "auto" }} className="rsvp-box">
          <Card
            className="rsvp-card"
            variant="outlined"
            style={{ alignItems: "center", display: "flex" }}
          >
            <CardContent style={{ margin: "auto" }}>{eventInfo}</CardContent>
          </Card>
        </Box>
      )}
    </div>
  );
}

export default Events;
