import { lazy, useEffect, useState, Suspense } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  makeStyles,
  IconButton,
  Typography,
  TextField,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  englishTextPassword,
  chineseTextPassword,
} from "./assets/data/translations";
import actions from "./actions/languageAction";
import Zhong from "./assets/images/zhong.png";
import English from "./assets/images/english.png";
import "./App.css";
const Topbar = lazy(() => import("./components/Topbar"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Events = lazy(() => import("./pages/Events"));
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Party = lazy(() => import("./pages/Party"));
const Questions = lazy(() => import("./pages/Questions"));
const Registry = lazy(() => import("./pages/Registry"));
const RSVP = lazy(() => import("./pages/RSVP"));
const Speeddial = lazy(() => import("./components/Speeddial"));
const Travel = lazy(() => import("./pages/Travel"));
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

let theme = createTheme({
  typography: { fontFamily: "Playfair Display" },
  components: {
    MuiCssBaseline: {
      styleOverrides: `@font-face {font-family: 'Playfair Display';}`,
    },
  },
});
theme = responsiveFontSizes(theme);

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [pass, setPass] = useState("");
  const language = useSelector((state) => state.language.language);
  const [showModal, setShowModal] = useState(true);
  const [showError, setShowError] = useState(false);

  let textLang;
  if (language === "En") textLang = englishTextPassword;
  else if (language === "Zh") textLang = chineseTextPassword;

  const changeLang = () => {
    if (language === "En") {
      dispatch(actions.changeLanguage("Zh"));
      localStorage.setItem("wang-wedding-lang", "Zh");
    } else {
      dispatch(actions.changeLanguage("En"));
      localStorage.removeItem("wang-wedding-lang");
    }
  };

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
    // If the local storage has language set, then display chinese
    const languageCheck = localStorage.getItem("wang-wedding-lang");
    if (languageCheck) {
      dispatch(actions.changeLanguage("Zh"));
    }
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Topbar />
            <Dialog
              open={showModal}
              BackdropProps={{ classes: { root: classes.backDrop } }}
              onClose={() => {}}
            >
              <DialogContent style={{ textAlign: "center" }}>
                <IconButton
                  className="zhongwen-button"
                  size="small"
                  onClick={changeLang}
                >
                  <Avatar src={language === "En" ? Zhong : English} />
                </IconButton>
                <Typography variant="h3" className="pass-modal">
                  {textLang.welcome}
                </Typography>
                <Typography variant="h4" className="pass-modal">
                  {textLang.pass}
                </Typography>
                <Typography
                  variant="h6"
                  className={classes.errorText}
                  hidden={!showError}
                >
                  {textLang.incorrect}
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
                    autoFocus
                  />
                  <Button type="submit" disabled={pass.length <= 0}>
                    {textLang.enter}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/story" element={<AboutUs />} />
              <Route path="/party" element={<Party />} />
              <Route path="/events" element={<Events />} />
              <Route path="/accommodations" element={<Travel />} />
              <Route path="/rsvp" element={<RSVP />} />
              <Route path="/registry" element={<Registry />} />
              <Route path="/questions" element={<Questions />} />
              <Route
                path="/thingstodo"
                exact
                element={
                  <div className="home-page">
                    The 2023 USA Ultimate Club Frisbee Regionals:{" "}
                    <a href="https://usaultimate.org/club/schedule/">
                      Information
                    </a>
                  </div>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Speeddial />
          </div>
        </ThemeProvider>
      </Suspense>
    </Router>
  );
}

export default App;
