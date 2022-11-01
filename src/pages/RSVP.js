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
  Paper,
  Select,
  MenuItem,
  MobileStepper,
  Snackbar,
  Stepper,
  Step,
  StepButton,
  StepLabel,
  Typography,
  TextField,
  Divider,
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
  const [steps, setSteps] = useState(["Attendance Info"]);
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

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  const handleStep = (step) => {
    setActiveStep(step);
  };

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep = isLastStep() ? activeStep : activeStep + 1;
    setActiveStep(newActiveStep);
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

  // Hook for when numGuests changes to add to RSVPState
  // useEffect(() => {
  //   let copyRSVP = [...rsvpState];
  //   if (numGuests > rsvpState.length) {
  //     for (let i = 0; i < numGuests - rsvpState.length; i++) {
  //       copyRSVP.push({
  //         firstName: undefined,
  //         lastName: undefined,
  //         email: undefined,
  //         dietary: undefined,
  //         food: undefined,
  //       });
  //     }
  //   } else if (numGuests === 0) {
  //     copyRSVP = [];
  //   } else {
  //     copyRSVP = copyRSVP.slice(0, numGuests);
  //   }
  //   setRSVPState(copyRSVP);
  // }, [numGuests]);
  useEffect(() => {
    let copySteps = [...steps];
    if (numGuests === 0) {
      copySteps = ["Attendance Info"];
    } else {
      for (let i = 0; i < numGuests; i++) {
        copySteps.push(`Guest ${i + 1}`);
      }
      copySteps.push("Review");
    }
    setSteps(copySteps);
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
            label={textLang.firstname}
            className="rsvp-text"
            value={rsvpState[i].firstName}
            onChange={(event) => setInfo(event.target.value, "firstName", i)}
          />
          <br />
          <TextField
            id="lastname-field"
            variant="standard"
            label={textLang.lastname}
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
      {cannotAttend && (
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          disabled={
            (numGuests === 0 && !cannotAttend) ||
            (cannotAttend &&
              !cannotAttendEmail &&
              !cannotAttendFirstname &&
              !cannotAttendLastname)
          }
          className={fail ? "failure-form" : ""}
          style={{
            textDecoration: "underline",
            border: "2px solid",
            marginBottom: "20px",
          }}
          onClick={submitRSVP}
        >
          {textLang.rsvpButton}
        </Button>
      )}
    </>
  );

  const stepMappings = { 0: attendanceInfo };

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
                  {stepMappings[activeStep]}
                  <MobileStepper
                    variant="text"
                    steps={steps.length}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === steps.length - 1}
                      >
                        Next
                        {<KeyboardArrowRight />}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        {<KeyboardArrowLeft />}
                        Back
                      </Button>
                    }
                  />
                </>
                //   <form onSubmit={submitRSVP} className="rsvp-form">
                //     <TextField
                //       id="guests-field"
                //       autoFocus
                //       variant="standard"
                //       label={textLang.guests}
                //       className="rsvp-text"
                //       type="number"
                //       hidden={cannotAttend}
                //       value={
                //         Number(numGuests).toString() === "0"
                //           ? ""
                //           : Number(numGuests).toString()
                //       }
                //       onChange={(event) => {
                //         event.target.value < 0
                //           ? (event.target.value = 0)
                //           : setNumGuests(Math.min(event.target.value, 8));
                //         setCannotAttend(false);
                //       }}
                //     />
                //     <FormGroup className="rsvp-text">
                //       <FormControlLabel
                //         control={<Checkbox checked={cannotAttend} />}
                //         label={textLang.cannotAttend}
                //         style={{ margin: "auto" }}
                //         hidden={numGuests > 0}
                //         onChange={() => {
                //           setCannotAttend(!cannotAttend);
                //           setNumGuests(0);
                //         }}
                //       />
                //     </FormGroup>
                //     <TextField
                //       id="cannot-email-field"
                //       variant="standard"
                //       label="Email*"
                //       className="rsvp-text"
                //       type="email"
                //       value={cannotAttendEmail}
                //       hidden={!cannotAttend}
                //       onChange={(event) =>
                //         setCannotAttendEmail(event.target.value)
                //       }
                //     />
                //     {cannotAttend && <br />}
                //     <TextField
                //       id="cannot-name-field"
                //       variant="standard"
                //       label={textLang.firstname}
                //       className="rsvp-text"
                //       type="text"
                //       value={cannotAttendFirstname}
                //       hidden={!cannotAttend}
                //       onChange={(event) =>
                //         setCannotAttendFirstname(event.target.value)
                //       }
                //     />
                //     {cannotAttend && <br />}
                //     <TextField
                //       id="cannot-name-field"
                //       variant="standard"
                //       label={textLang.lastname}
                //       className="rsvp-text"
                //       type="text"
                //       value={cannotAttendLastname}
                //       hidden={!cannotAttend}
                //       onChange={(event) =>
                //         setCannotAttendLastname(event.target.value)
                //       }
                //     />
                //     {cannotAttend && <br />}
                //     {rsvpInfo}
                //     <br />
                //     <Button
                //       type="submit"
                //       variant="outlined"
                //       color="primary"
                //       disabled={
                //         (numGuests === 0 && !cannotAttend) ||
                //         (cannotAttend &&
                //           !cannotAttendEmail &&
                //           !cannotAttendFirstname &&
                //           !cannotAttendLastname)
                //       }
                //       className={fail ? "failure-form" : ""}
                //       style={{
                //         textDecoration: "underline",
                //         border: "2px solid",
                //       }}
                //     >
                //       {textLang.rsvpButton}
                //     </Button>
                //   </form>
                // </>
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
