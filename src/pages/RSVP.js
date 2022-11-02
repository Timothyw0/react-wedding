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
  Grid,
  InputLabel,
  Paper,
  Select,
  MenuItem,
  MobileStepper,
  Snackbar,
  Typography,
  TextField,
} from "@material-ui/core";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
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
  const [activeStep, setActiveStep] = useState(0);
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

  const [steps, setSteps] = useState([textLang.attendanceInfo]);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    if (isLastStep()) {
      submitRSVP();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  useEffect(() => {
    let copySteps = [...steps];
    if (numGuests === 0) {
      copySteps = [textLang.attendanceInfo];
    } else {
      for (let i = 0; i < numGuests; i++) {
        copySteps.push(`${textLang.guestPrefix} ${i + 1}`);
      }
      copySteps.push(textLang.review);
    }
    setSteps(copySteps);
    let copyRSVP = [...rsvpState];
    if (numGuests > rsvpState.length) {
      for (let i = 0; i < numGuests - rsvpState.length; i++) {
        copyRSVP.push({
          firstName: "",
          lastName: "",
          email: "",
          dietary: "",
          food: "",
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
    if (event) event.preventDefault();
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

  const attendanceInfo = (
    <>
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
        label="Email*"
        className="rsvp-text"
        type="email"
        value={cannotAttendEmail}
        hidden={!cannotAttend}
        onChange={(event) => setCannotAttendEmail(event.target.value)}
      />
      {cannotAttend && <br />}
      <TextField
        id="cannot-name-field"
        variant="standard"
        label={textLang.firstname}
        className="rsvp-text"
        type="text"
        value={cannotAttendFirstname}
        hidden={!cannotAttend}
        onChange={(event) => setCannotAttendFirstname(event.target.value)}
      />
      {cannotAttend && <br />}
      <TextField
        id="cannot-name-field"
        variant="standard"
        label={textLang.lastname}
        className="rsvp-text"
        type="text"
        value={cannotAttendLastname}
        hidden={!cannotAttend}
        onChange={(event) => setCannotAttendLastname(event.target.value)}
        style={{
          marginBottom: "20px",
        }}
      />
      {cannotAttend && <br />}
    </>
  );

  const guestForm = (index) => {
    if (!rsvpState[index]) return;
    return (
      <>
        <TextField
          id="firstname-field"
          variant="standard"
          label={textLang.firstname}
          className="rsvp-text"
          value={rsvpState[index].firstName}
          onChange={(event) => setInfo(event.target.value, "firstName", index)}
        />
        <br />
        <TextField
          id="lastname-field"
          variant="standard"
          label={textLang.lastname}
          className="rsvp-text"
          value={rsvpState[index].lastName}
          onChange={(event) => setInfo(event.target.value, "lastName", index)}
        />
        <br />
        {index === 0 && (
          <>
            <TextField
              id="email-field"
              variant="standard"
              label={textLang.email}
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
          label={textLang.dietary}
          className="rsvp-text"
          type="text"
          value={rsvpState[index].dietary}
          onChange={(event) => setInfo(event.target.value, "dietary", index)}
        />
        <br />
        <FormControl style={{ width: "166px", paddingTop: "0px" }}>
          <InputLabel id="demo-simple-select-label">{textLang.food}</InputLabel>
          <Select
            value={rsvpState[index].food}
            MenuProps={{ disableScrollLock: true }}
            label={textLang.food}
            onChange={(event) => setInfo(event.target.value, "food", index)}
          >
            <MenuItem value={"chicken"}>{textLang.foodChoices[0]}</MenuItem>
            <MenuItem value={"beef"}>{textLang.foodChoices[1]}</MenuItem>
            <MenuItem value={"milk"}>{textLang.foodChoices[2]}</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
      </>
    );
  };

  const reviewForm = rsvpState && (
    <>
      <Grid container>
        <Grid item xs={12} style={{ paddingBottom: 0, marginTop: "5px" }}>
          <h4>{textLang.rsvpNote}</h4>
        </Grid>
        {rsvpState.map((elem, index) => {
          return (
            <>
              <Grid item xs={12} style={{ paddingBottom: 0, marginTop: "5px" }}>
                <h4>
                  {textLang.guestPrefix} {index + 1}
                </h4>
              </Grid>
              <Grid item xs={5} className="review-item review-title">
                {textLang.firstname}:
              </Grid>
              <Grid item xs={7} className="review-item">
                {elem?.firstName}
              </Grid>
              <Grid item xs={5} className="review-item review-title">
                {textLang.lastname}:
              </Grid>
              <Grid item xs={7} className="review-item">
                {elem?.lastName}
              </Grid>
              {index === 0 && (
                <>
                  <Grid item xs={5} className="review-item review-title">
                    Email:
                  </Grid>
                  <Grid item xs={7} className="review-item">
                    {elem?.email}
                  </Grid>
                </>
              )}
              <Grid item xs={5} className="review-item review-title">
                {textLang.dietary}:
              </Grid>
              <Grid item xs={7} className="review-item">
                {elem?.dietary}
              </Grid>
              <Grid item xs={5} className="review-item review-title">
                {textLang.food}:
              </Grid>
              <Grid item xs={7} className="review-item">
                {elem?.food}
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );

  const stepMappings = (index) => {
    if (index === 0) return attendanceInfo;
    else if (index === steps.length - 1) return reviewForm;
    else return guestForm(index - 1);
  };

  return (
    <div className="rsvp-div">
      <Card
        style={{
          maxWidth: isMobile ? "100%" : "60%",
          margin: "auto",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderRadius: "5px",
        }}
      >
        <CardMedia component="img" height="100%" image={rsvpPhoto} />
        <CardContent>
          <div>
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
            <Box
              sx={{
                width: "100%",
                margin: "auto",
              }}
              className="rsvp-box"
            >
              {success || thanks ? (
                <Typography variant="h4">{textLang.thanksRSVP}</Typography>
              ) : (
                <>
                  <Paper
                    square
                    elevation={0}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: 50,
                    }}
                    style={{ background: "#fafafa", padding: "10px" }}
                  >
                    <Typography variant="h6" style={{ width: "100%" }}>
                      {steps[activeStep]}
                    </Typography>
                  </Paper>
                  {stepMappings(activeStep)}
                  <MobileStepper
                    variant="text"
                    steps={steps.length}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={!numGuests && !cannotAttend}
                      >
                        {activeStep === steps.length - 1 ? (
                          <>{textLang.rsvpButton}</>
                        ) : (
                          <>
                            {textLang.nextButton}
                            <KeyboardArrowRight />
                          </>
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        {<KeyboardArrowLeft />}
                        {textLang.backButton}
                      </Button>
                    }
                  />
                </>
              )}
            </Box>
          </div>
        </CardContent>
      </Card>
      <Snackbar
        open={success}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {textLang.success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={fail}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {failMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={thanks && language !== "Zh"}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {thanksMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default RSVP;
