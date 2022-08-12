import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Typography,
  TextField,
  Divider,
} from "@material-ui/core";
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
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");

  const [width, setWidth] = useState(window.innerWidth);

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
    } else {
      copyRSVP = copyRSVP.slice(0, numGuests);
    }
    console.log(copyRSVP);
    setRSVPState(copyRSVP);
  }, [numGuests]);

  const handleClose = () => {
    setSuccess(false);
    setFail(false);
    setFailMessage("");
  };

  const submitRSVP = async (event) => {
    event.preventDefault();
    let error = false;
    const rsvpCol = collection(db, "wedding-dev");
    const rsvps = await getDocs(rsvpCol);
    if (!rsvps.docs) {
      setFailMessage("Something went wrong! Please tell Tim!");
      setFail(true);
      return;
    }
    // Check if they are already RSVP'd
    rsvps.docs.map((doc) => {
      let data = doc.data();
      if (data.email === rsvpState[0].email) {
        setFailMessage("You are already RSVP'd!");
        setFail(true);
        error = true;
        return;
      }
    });
    if (error) {
      return;
    }
    // Check if everything is entered
    for (let i = 0; i < rsvpState.length; i++) {
      let fields = ["firstName", "lastName", "email", "dietary", "food"];
      for (const field of fields) {
        if (field === "email" && i === 0) continue;
        if (!rsvpState[i][field]) {
          setFailMessage(`You haven't filled out ${field} for person ${i}!`);
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
      });
      if (!add) {
        setFailMessage("Something went wrong! Please tell Tim!");
        setFail(true);
        return;
      }
    }
    setSuccess(true);
    return;
  };

  // setInfo function to set the RSVP state on any form change
  const setInfo = (value, attribute, key) => {
    let copyRSVP = [...rsvpState];
    copyRSVP[key][attribute] = value;
    setRSVPState(copyRSVP);
    console.log(rsvpState);
  };

  useEffect(() => {
    if (rsvpState.length === 0) return;
    let infoArr = [];
    for (let i = 0; i < numGuests; i++) {
      infoArr.push(
        <>
          <TextField
            id="firstname-field"
            variant="standard"
            placeholder="First Name"
            className="rsvp-text"
            value={rsvpState[i].firstName}
            onChange={(event) => setInfo(event.target.value, "firstName", i)}
          />
          <br />
          <TextField
            id="lastname-field"
            variant="standard"
            placeholder="Last Name"
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
                placeholder="Email"
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
            placeholder="Dietary Restrictions"
            className="rsvp-text"
            type="text"
            value={rsvpState[i].dietary}
            onChange={(event) => setInfo(event.target.value, "dietary", i)}
          />
          <br />
          <FormControl style={{ width: "166px", paddingTop: "0px" }}>
            <InputLabel id="demo-simple-select-label">
              Food Selection
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rsvpState[i].food}
              label="Food Selection"
              onChange={(event) => setInfo(event.target.value, "food", i)}
            >
              <MenuItem value={"chicken"}>Chicken</MenuItem>
              <MenuItem value={"beef"}>Beef</MenuItem>
              <MenuItem value={"milk"}>Milk</MenuItem>
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
              {success ? (
                <Typography variant="h4">Thank you for RSVP'ing!</Typography>
              ) : (
                <>
                  <Typography
                    variant="h4"
                    className={fail ? "rsvp-text failure-form" : "rsvp-text"}
                    style={{ fontFamily: "Fairplay Display" }}
                  >
                    We hope that you can make it!
                  </Typography>
                  <Typography
                    variant="p"
                    className={fail ? "rsvp-text failure-form" : "rsvp-text"}
                    style={{ fontFamily: "Fairplay Display" }}
                  >
                    Please enter your information below to RSVP:
                  </Typography>
                  <form onSubmit={submitRSVP} className="rsvp-form">
                    <TextField
                      id="guests-field"
                      variant="standard"
                      placeholder="# of Guests"
                      className="rsvp-text"
                      type="number"
                      value={numGuests}
                      onChange={(event) =>
                        event.target.value < 0
                          ? (event.target.value = 0)
                          : setNumGuests(event.target.value)
                      }
                    />
                    <br />
                    {rsvpInfo}
                    <Button
                      type="submit"
                      disabled={numGuests === 0}
                      className={fail ? "failure-form" : ""}
                    >
                      RSVP!
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={success}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          You have RSVP'd! Can't wait to see you!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={fail}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {failMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default RSVP;
