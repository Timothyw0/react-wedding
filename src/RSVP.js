import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import "./RSVP.css";

function RSVP() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [numGuests, setNumGuests] = useState(0);

    const submitRSVP = (event) => {
    }

    return (
        <div className="rsvp-div">
            <div className="rsvp-form">
                <Box sx={{ width: "60%", margin: "auto" }}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h3" className="rsvp-text">
                                We hope that you can make it!
                            </Typography>
                            <Typography variant="h4" className="rsvp-text">
                                Please enter your information below to RSVP:
                            </Typography>
                            <form onSubmit={submitRSVP}>
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
