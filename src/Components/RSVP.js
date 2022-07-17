import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Typography,
  TextField,
} from "@material-ui/core";
import MuiAlert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import rsvpPhoto from "../assets/images/RSVP.jpg";
import backPhoto from "../assets/images/rsvp_back.png";
import db from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import "./RSVP.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RSVP() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [numGuests, setNumGuests] = useState(0);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");

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
      if (data.email === email) {
        setFailMessage("You are already RSVP'd!");
        setFail(true);
        error = true;
        return;
      }
    });
    if (error) {
      return;
    }
    // Add them to the database if new
    const add = await addDoc(rsvpCol, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      numGuests: numGuests,
    });
    if (!add) {
      setFailMessage("Something went wrong! Please tell Tim!");
      setFail(true);
      return;
    } else {
      setSuccess(true);
      return;
    }
  };

  return (
    <div
      className="rsvp-div"
      style={{
        backgroundImage: `url(${backPhoto})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div>
        <Box sx={{ width: "60%", margin: "auto" }} className="rsvp-box">
          <Card className="rsvp-card" variant="outlined">
            <CardMedia
              component="img"
              image={rsvpPhoto}
              alt="RSVP Photo"
              className="rsvp-photo"
            />
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
                      id="firstname-field"
                      variant="standard"
                      placeholder="First Name"
                      className="rsvp-text"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                    <br />
                    <TextField
                      id="lastname-field"
                      variant="standard"
                      placeholder="Last Name"
                      className="rsvp-text"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                    <br />
                    <TextField
                      id="email-field"
                      variant="standard"
                      placeholder="Email"
                      className="rsvp-text"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <br />
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
                    <Button
                      type="submit"
                      disabled={
                        firstName.length === 0 ||
                        lastName.length === 0 ||
                        email.length === 0 ||
                        numGuests === 0
                      }
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
