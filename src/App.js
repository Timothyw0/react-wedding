import logo from "./logo.svg";
import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    makeStyles,
    Typography,
    TextField,
} from "@material-ui/core";
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
    }, [])

    return (
        <div className="App">
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
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
