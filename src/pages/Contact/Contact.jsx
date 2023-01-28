import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import divider from "../assets/images/divider.png";
import manPhoto from "../assets/images/man_copy.png";
import womanPhoto from "../assets/images/woman.jpeg";
import {memo} from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-div">
      <header className="contact-header">
        <Typography variant="h2" style={{ fontFamily: "Fairplay Display" }}>
          Contact Us
        </Typography>
        <img
          src={divider}
          alt="Divider"
          style={{ width: "20%", padding: "15px" }}
        ></img>
      </header>
      <div className="contact-div">
        <div className="person1">
          <Typography variant="h3" style={{ fontFamily: "Fairplay Display" }}>
            Timothy Wang
          </Typography>
          <Divider
            variant="middle"
            style={{
              width: "75%",
              background: "black",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "9px",
            }}
          />
          <div className="contact-info">
            <i class="fa-solid fa-phone" style={{ paddingRight: "10px" }}></i>
            <Typography
              variant="body1"
              style={{ fontFamily: "Fairplay Display" }}
              className="person-text"
            >
              (732)-939-3051
            </Typography>
          </div>
          <div className="contact-info">
            <i
              class="fa-solid fa-envelope"
              style={{ paddingRight: "10px" }}
            ></i>
            <a href="mailto:timothyw0@gmail.com">timothyw0@gmail.com</a>
          </div>
        </div>
        <div className="person2">
          <Typography
            variant="h3"
            style={{ fontFamily: "Fairplay Display" }}
            className="person-text"
          >
            Madeleine Herring
          </Typography>
          <Divider
            variant="middle"
            style={{
              width: "75%",
              background: "black",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "9px",
            }}
          />
          <div className="contact-info">
            <i class="fa-solid fa-phone" style={{ paddingRight: "10px" }}></i>
            <Typography
              variant="body1"
              style={{ fontFamily: "Fairplay Display" }}
              className="person-text"
            >
              (845)-820-3221
            </Typography>
          </div>
          <div className="contact-info">
            <i
              class="fa-solid fa-envelope"
              style={{ paddingRight: "10px" }}
            ></i>
            <a href="mailto:madeleineherring@gmail.com">
              madeleineherring@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="contact-div">
        <Carousel
          autoPlay={true}
          showIndicators={false}
          showThumbs={false}
          showArrows={false}
          showStatus={false}
          width={"40%"}
          infiniteLoop={true}
          interval={5000}
        >
          <div>
            <img src={manPhoto} />
          </div>
          <div>
            <img src={womanPhoto} />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default memo(Contact);
