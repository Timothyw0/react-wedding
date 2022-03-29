import homePhoto from "./home_photo.jpeg";
import divider from "./divider.png";
import { useEffect, useState } from "react";
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
import Topbar from "./Components/Topbar";
import AboutUs from "./Components/AboutUs";
import Events from "./Components/Events";
import Party from "./Components/Party";
import RSVP from "./Components/RSVP";
import "./App.css";
const sha512 = require("js-sha512").sha512;

const useStyles = makeStyles((theme) => ({
    backDrop: {
        backdropFilter: "blur(15px)",
        backgroundColor: "rgba(0,0,30,0.4)",
        boxShadow:
            "0 1px 1px rgb(0 0 0 / 12%), 0 2px 2px rgb(0 0 0 / 12%), 0 4px 4px rgb(0 0 0 / 12%), 0 8px 8px rgb(0 0 0 / 12%), 0 16px 16px rgb(0 0 0 / 12%)",
    },
    errorText: {
        color: "red",
        fontWeight: "bold",
    },
}));

let theme = createTheme();
theme = responsiveFontSizes(theme);

function App() {
    const classes = useStyles();
    const [pass, setPass] = useState("");
    const [showModal, setShowModal] = useState(true);
    const [showError, setShowError] = useState(false);

    const checkPass = (e) => {
        e.preventDefault();
        const inputPass = e.target[0].value;
        if (sha512(inputPass) === process.env.REACT_APP_SITE_PASSWORD) {
            setShowModal(false);
            setShowError(false);
            localStorage.setItem("wang-pass", "verified");
            return;
        }
        setShowError(true);
    };

    const handleChange = (e) => {
        setPass(e.target.value);
    };

    // Check the localstorage to see if the password has been entered already
    useEffect(() => {
        const check = localStorage.getItem("wang-pass");
        if (check === "verified") {
            setShowModal(false);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Topbar />
                <Dialog
                    open={showModal}
                    BackdropProps={{ classes: { root: classes.backDrop } }}
                    onClose={() => {}}
                >
                    <DialogContent style={{ textAlign: "center" }}>
                        <Typography variant="h3" className="pass-modal">
                            Welcome!
                        </Typography>
                        <Typography variant="h4" className="pass-modal">
                            Please enter the password to continue:
                        </Typography>
                        <Typography
                            variant="h6"
                            className={classes.errorText}
                            hidden={!showError}
                        >
                            The password is incorrect! Please try again.
                        </Typography>
                        <form onSubmit={checkPass}>
                            <TextField
                                id="password-field"
                                variant="standard"
                                placeholder="Password"
                                className="pass-modal"
                                value={pass}
                                onChange={handleChange}
                                type="password"
                            />
                            <Button type="submit" disabled={pass.length <= 0}>
                                Enter!
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
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
                    <Box sx={{ width: "40%", margin: "auto" }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography
                                    variant="h3"
                                    style={{ fontFamily: "Fairplay Display" }}
                                >
                                    A Brrap & A Brrap
                                </Typography>
                                <img
                                    src={divider}
                                    alt="Divider"
                                    style={{ width: "80%", padding: "15px" }}
                                ></img>
                                <Typography
                                    variant="h6"
                                    style={{ fontFamily: "Fairplay Display" }}
                                >
                                    well meaning and kindly.
                                    <br />
                                    {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </section>
                <section id="about">
                    <AboutUs />
                </section>
                <section id="party">
                    <Party />
                </section>
                <section id="events">
                    <Events />
                </section>
                <section id="rsvp">
                    <RSVP />
                    </section>
                <footer className="footer">
                    <div className="footer-div">
                        <span className="footer-left">
                            <Typography
                                variant="h6"
                                style={{
                                    paddingLeft: "15px",
                                    fontFamily: "Fairplay Display",
                                }}
                            >
                                Created by Timothy Wang
                            </Typography>
                        </span>
                        <span className="footer-right">
                            <Typography
                                variant="h6"
                                style={{
                                    paddingRight: "15px",
                                    fontFamily: "Fairplay Display",
                                }}
                            >
                                Check out this site's code here!
                                <a href="https://github.com/Timothyw0/react-wedding">
                                    <i
                                        className="fa fa-github"
                                        style={{
                                            paddingLeft: "15px",
                                            fontSize: "24px",
                                        }}
                                    ></i>
                                </a>
                            </Typography>
                        </span>
                    </div>
                </footer>
            </div>
        </ThemeProvider>
    );
}

export default App;
