import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  makeStyles,
  Typography,
  TextField,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Topbar from "./components/Topbar";
import AboutUs from "./components/AboutUs";
import Events from "./components/Events";
import Home from "./components/Home";
import Party from "./components/Party";
import RSVP from "./components/RSVP";
import Speeddial from "./components/Speeddial";
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
    <Router>
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

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/party" element={<Party />} />
            <Route path="/events" element={<Events />} />
            <Route path="/rsvp" element={<RSVP />} />
          </Routes>
          {/*<section id="about">
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
        <section id="contact">
          <Contact />
        </section>*/}
          <Speeddial />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
