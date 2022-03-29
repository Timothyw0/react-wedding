import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import rsvpPhoto from "../RSVP.jpg";
import db from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import "./RSVP.css";

function RSVP() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [numGuests, setNumGuests] = useState(0);

    const submitRSVP = async (event) => {
        event.preventDefault();
        let error = false;
        const rsvpCol = collection(db, "wedding-dev");
        const rsvps = await getDocs(rsvpCol);
        if (!rsvps.docs) {
            alert("Something went wrong! Please tell Tim!");
            return;
        }
        // Check if they are already RSVP'd
        rsvps.docs.map((doc) => {
            let data = doc.data();
            if (data.email === email) {
                alert("You are already RSVP'd!");
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
            numGuests: numGuests
        });
        if (!add) {
            alert("Something went wrong! Please tell Tim!");
            return;
        } else {
            alert("You have RSVP'd! Can't wait to see you!");
            return;
        }
    };

    return (
        <div className="rsvp-div">
            <div className="rsvp-form">
                <Box sx={{ width: "60%", margin: "auto" }} className="rsvp-box">
                    <Card className="rsvp-card" variant="outlined">
                        <CardMedia
                            component="img"
                            image={rsvpPhoto}
                            alt="RSVP Photo"
                            className="rsvp-photo"
                        />
                        <CardContent>
                            <Typography
                                variant="h3"
                                className="rsvp-text"
                                style={{ fontFamily: "Fairplay Display" }}
                            >
                                We hope that you can make it!
                            </Typography>
                            <Typography
                                variant="h4"
                                className="rsvp-text"
                                style={{ fontFamily: "Fairplay Display" }}
                            >
                                Please enter your information below to RSVP:
                            </Typography>
                            <form onSubmit={submitRSVP}>
                                <TextField
                                    id="firstname-field"
                                    variant="standard"
                                    placeholder="First Name"
                                    className="rsvp-text"
                                    value={firstName}
                                    onChange={(event) =>
                                        setFirstName(event.target.value)
                                    }
                                />
                                <br />
                                <TextField
                                    id="lastname-field"
                                    variant="standard"
                                    placeholder="Last Name"
                                    className="rsvp-text"
                                    value={lastName}
                                    onChange={(event) =>
                                        setLastName(event.target.value)
                                    }
                                />
                                <br />
                                <TextField
                                    id="email-field"
                                    variant="standard"
                                    placeholder="Email"
                                    className="rsvp-text"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
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
                                >
                                    RSVP!
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Box>
            </div>
        </div>
    );
}

export default RSVP;
