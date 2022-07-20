import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  englishTextStory,
  chineseTextStory,
} from "../assets/data/translations";
import divider from "../assets/images/divider.png";
import us1 from "../assets/images/us.jpg";
import backPhoto from "../assets/images/story_back.png";
import "./AboutUs.css";

function AboutUs() {
  const language = useSelector((state) => state.language.language);

  let textLang;
  if (language === "En") textLang = englishTextStory;
  else if (language === "Zh") textLang = chineseTextStory;

  return (
    <div
      className="about-div"
      style={{
        backgroundImage: `url(${backPhoto})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
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
          display="inline"
          style={{
            fontFamily: "Fairplay Display",
            wordWrap: "break-word",
          }}
        >
          {textLang.story}
        </Typography>
      </div>
    </div>
  );
}

export default AboutUs;
