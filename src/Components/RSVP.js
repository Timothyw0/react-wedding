import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Typography,
  TextField,
  Divider,
} from "@material-ui/core";
import { englishTextRSVP, chineseTextRSVP } from "../assets/data/translations";
import { useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import rsvpPhoto from "../assets/images/RSVP.jpg";
import backPhoto from "../assets/images/qa_back.jpeg";
import db from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import "./RSVP.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RSVP() {
  const [numGuests, setNumGuests] = useState(0);
  const [rsvpState, setRSVPState] = useState([]);
  const [rsvpInfo, setRSVPInfo] = useState(undefined);
  const [cannotAttend, setCannotAttend] = useState(false);
  const [cannotAttendEmail, setCannotAttendEmail] = useState("");
  const [cannotAttendFirstname, setCannotAttendFirstname] = useState("");
  const [cannotAttendLastname, setCannotAttendLastname] = useState("");
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [thanksMessage, setThanksMessage] = useState("");

  const [width, setWidth] = useState(window.innerWidth);

  const language = useSelector((state) => state.language.language);

  let textLang;
  if (language === "En") textLang = englishTextRSVP;
  else if (language === "Zh") textLang = chineseTextRSVP;

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

  // Hook for when numGuests changes to add to RSVPState
  useEffect(() => {
    let copyRSVP = [...rsvpState];
    if (numGuests > rsvpState.length) {
      for (let i = 0; i < numGuests - rsvpState.length; i++) {
        copyRSVP.push({
          firstName: undefined,
          lastName: undefined,
          email: undefined,
          dietary: undefined,
          food: undefined,
        });
      }
    } else if (numGuests === 0) {
      copyRSVP = [];
    } else {
      copyRSVP = copyRSVP.slice(0, numGuests);
    }
    setRSVPState(copyRSVP);
  }, [numGuests]);

  const handleClose = () => {
    setSuccess(false);
    setFail(false);
    setFailMessage("");
    setThanks(false);
    setThanksMessage("");
  };

  const submitRSVP = async (event) => {
    event.preventDefault();
    let error = false;
    const rsvpCol = collection(db, "wedding-dev");
    const rsvps = await getDocs(rsvpCol);
    if (!rsvps.docs) {
      setFailMessage(textLang.error);
      setFail(true);
      return;
    }
    // Error check
    if (cannotAttendEmail.length === 0 && cannotAttend) {
      setFailMessage(textLang.missingEmail);
      setFail(true);
      error = true;
      return;
    }
    // Check if they are already RSVP'd
    rsvps.docs.map((doc) => {
      let data = doc.data();
      if (
        (rsvpState.length > 0 && data.email === rsvpState[0].email) ||
        data.email === cannotAttendEmail
      ) {
        setFailMessage(textLang.alreadyRSVP);
        setFail(true);
        error = true;
        return;
      }
    });
    if (error) {
      return;
    }
    // Now to check if they are not able to attend
    if (cannotAttend) {
      const add = await addDoc(rsvpCol, {
        email: cannotAttendEmail,
        firstName: cannotAttendFirstname,
        lastName: cannotAttendLastname,
        cannotAttend: true,
      });
      if (!add) {
        setFailMessage(textLang.error);
        setFail(true);
        return;
      }
      setThanksMessage(textLang.thanks);
      setThanks(true);
      return;
    } else {
      // Check if everything is entered
      for (let i = 0; i < rsvpState.length; i++) {
        let fields = ["firstName", "lastName", "email", "food"];
        for (const field of fields) {
          if (field === "email" && i !== 0) continue;
          if (!rsvpState[i][field] || rsvpState[i][field].length === 0) {
            setFailMessage(textLang.checkFieldMessage);
            setFail(true);
            error = true;
            return;
          }
        }
      }
      // Add them to the database if new
      for (let i = 0; i < rsvpState.length; i++) {
        const add = await addDoc(rsvpCol, {
          firstName: rsvpState[i].firstName,
          lastName: rsvpState[i].lastName,
          email: rsvpState[0].email,
          dietary: rsvpState[i].dietary || "",
          food: rsvpState[i].food,
        });
        if (!add) {
          setFailMessage(textLang.error);
          setFail(true);
          return;
        }
      }
      setSuccess(true);
      return;
    }
  };

  // setInfo function to set the RSVP state on any form change
  const setInfo = (value, attribute, key) => {
    let copyRSVP = [...rsvpState];
    copyRSVP[key][attribute] = value;
    setRSVPState(copyRSVP);
  };

  useEffect(() => {
    if (rsvpState.length === 0) {
      setRSVPInfo([]);
      return;
    }
    let infoArr = [];
    for (let i = 0; i < numGuests; i++) {
      infoArr.push(
        <>
          <TextField
            id="firstname-field"
            variant="standard"
            placeholder={textLang.firstname}
            className="rsvp-text"
            value={rsvpState[i].firstName}
            onChange={(event) => setInfo(event.target.value, "firstName", i)}
          />
          <br />
          <TextField
            id="lastname-field"
            variant="standard"
            placeholder={textLang.lastname}
            className="rsvp-text"
            value={rsvpState[i].lastName}
            onChange={(event) => setInfo(event.target.value, "lastName", i)}
          />
          <br />
          {i === 0 && (
            <>
              <TextField
                id="email-field"
                variant="standard"
                placeholder={textLang.email}
                className="rsvp-text"
                type="email"
                value={rsvpState[0].email}
                onChange={(event) => setInfo(event.target.value, "email", 0)}
              />
              <br />
            </>
          )}
          <TextField
            id="dietary-field"
            variant="standard"
            placeholder={textLang.dietary}
            className="rsvp-text"
            type="text"
            value={rsvpState[i].dietary}
            onChange={(event) => setInfo(event.target.value, "dietary", i)}
          />
          <br />
          <FormControl style={{ width: "166px", paddingTop: "0px" }}>
            <InputLabel id="demo-simple-select-label">
              {textLang.food}
            </InputLabel>
            <Select
              value={rsvpState[i].food}
              MenuProps={{ disableScrollLock: true }}
              label={textLang.food}
              onChange={(event) => setInfo(event.target.value, "food", i)}
            >
              <MenuItem value={"chicken"}>{textLang.foodChoices[0]}</MenuItem>
              <MenuItem value={"beef"}>{textLang.foodChoices[1]}</MenuItem>
              <MenuItem value={"milk"}>{textLang.foodChoices[2]}</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          {i !== rsvpState.length - 1 ? (
            <>
              <hr style={{ width: "50%", margin: "auto" }} />
              <br />
            </>
          ) : (
            <></>
          )}
        </>
      );
    }
    setRSVPInfo(infoArr);
  }, [rsvpState.length]);

  return (
    <div
      className="rsvp-div"
      style={{
        backgroundImage: `url(${backPhoto})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        overflowY: "scroll",
      }}
    >
      <div className="rsvp-photo-div">
        <img
          src={rsvpPhoto}
          style={{ width: isMobile ? "60%" : "30%", borderRadius: "15px" }}
        />
      </div>
      <div>
        <Box
          sx={{ width: isMobile ? "60%" : "30%", margin: "auto" }}
          className="rsvp-box"
        >
          <Card className="rsvp-card" variant="outlined">
            <CardContent>
              {success || thanks ? (
                <Typography variant="h4">{textLang.thanksRSVP}</Typography>
              ) : (
                <>
                  <Typography
                    variant="h4"
                    className={fail ? "rsvp-text failure-form" : "rsvp-text"}
                    style={{ fontFamily: "Fairplay Display" }}
                  >
                    {textLang.header}
                  </Typography>
                  <Typography
                    variant="p"
                    className={fail ? "rsvp-text failure-form" : "rsvp-text"}
                    style={{ fontFamily: "Fairplay Display" }}
                  >
                    {textLang.subheader}
                  </Typography>
                  <form onSubmit={submitRSVP} className="rsvp-form">
                    <TextField
                      id="guests-field"
                      autoFocus
                      variant="standard"
                      label={textLang.guests}
                      className="rsvp-text"
                      type="number"
                      hidden={cannotAttend}
                      value={
                        Number(numGuests).toString() === "0"
                          ? ""
                          : Number(numGuests).toString()
                      }
                      onChange={(event) => {
                        event.target.value < 0
                          ? (event.target.value = 0)
                          : setNumGuests(Math.min(event.target.value, 8));
                        setCannotAttend(false);
                      }}
                    />
                    <FormGroup className="rsvp-text">
                      <FormControlLabel
                        control={<Checkbox checked={cannotAttend} />}
                        label={textLang.cannotAttend}
                        style={{ margin: "auto" }}
                        hidden={numGuests > 0}
                        onChange={() => {
                          setCannotAttend(!cannotAttend);
                          setNumGuests(0);
                        }}
                      />
                    </FormGroup>
                    <TextField
                      id="cannot-email-field"
                      variant="standard"
                      placeholder="Email*"
                      className="rsvp-text"
                      type="email"
                      value={cannotAttendEmail}
                      hidden={!cannotAttend}
                      onChange={(event) =>
                        setCannotAttendEmail(event.target.value)
                      }
                    />
                    <br />
                    <TextField
                      id="cannot-name-field"
                      variant="standard"
                      placeholder={textLang.firstname}
                      className="rsvp-text"
                      type="text"
                      value={cannotAttendFirstname}
                      hidden={!cannotAttend}
                      onChange={(event) =>
                        setCannotAttendFirstname(event.target.value)
                      }
                    />
                    <br />
                    <TextField
                      id="cannot-name-field"
                      variant="standard"
                      placeholder={textLang.lastname}
                      className="rsvp-text"
                      type="text"
                      value={cannotAttendLastname}
                      hidden={!cannotAttend}
                      onChange={(event) =>
                        setCannotAttendLastname(event.target.value)
                      }
                    />
                    <br />
                    {rsvpInfo}
                    <Button
                      type="submit"
                      variant="outlined"
                      disabled={
                        numGuests === 0 &&
                        cannotAttend &&
                        (!cannotAttendEmail ||
                          !cannotAttendFirstname ||
                          !cannotAttendLastname)
                      }
                      className={fail ? "failure-form" : ""}
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      {textLang.rsvpButton}
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </div>
      <Snackbar
        open={success}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {textLang.success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={fail}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {failMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={thanks && language !== "Zh"}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {thanksMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default RSVP;
