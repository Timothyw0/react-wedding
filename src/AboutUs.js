import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogContent,
    makeStyles,
    Typography,
    TextField,
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from "@material-ui/core";
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
                        variant="h4"
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
                        variant="h4"
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
            <div className="story-div">
                <Typography
                    variant="h4"
                    style={{ fontFamily: "Fairplay Display" }}
                >
                    Brrap
                    BrrapBrrapBrrapBrrapBrrapBrrapBrrapBrrapBrrapBrrapBrrapBrrapBrrapBrrap
                </Typography>
            </div>
        </div>
    );
}

export default AboutUs;
