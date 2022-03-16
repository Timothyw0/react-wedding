import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import manPhoto from "./man.jpeg";
import womanPhoto from "./woman.jpeg";
import "./AboutUs.css";

function AboutUs() {
    return (
        <div className="about-div">
            <div className="img-div">
                <div className="person1">
                    <img src={manPhoto} className="about-img"></img>
                    <Typography
                        variant="h3"
                        style={{ fontFamily: "Fairplay Display" }}
                    >
                        Brrap Brrap 1
                    </Typography>
                    <Typography
                        variant="body1"
                        style={{ fontFamily: "Fairplay Display" }}
                        className="person-text"
                    >
                        I don't know what I'm doing here
                    </Typography>
                </div>
                <div className="person2">
                    <img src={womanPhoto} className="about-img"></img>
                    <Typography
                        variant="h3"
                        style={{ fontFamily: "Fairplay Display" }}
                        className="person-text"
                    >
                        Brrap Brrap 2
                    </Typography>
                    <Typography
                        variant="body1"
                        style={{ fontFamily: "Fairplay Display" }}
                        className="person-text"
                    >
                        I don't know what I'm doing here
                    </Typography>
                </div>
            </div>
            <div className="divider-div">
                <Divider
                    variant="middle"
                    style={{
                        width: "75%",
                        background: "black",
                        margin: "auto",
                    }}
                />
            </div>
            <div className="story-div">
                <Typography
                    variant="h4"
                    style={{
                        fontFamily: "Fairplay Display",
                        wordWrap: "break-word",
                    }}
                >
                    Brrap BrrapBrrapBrrapBrrapBrrapBrrap
                    BrrapBrrapBrrapBrrapBrrapBrrapBrrapBrrap
                </Typography>
            </div>
        </div>
    );
}

export default AboutUs;
