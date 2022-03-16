import { Grid, Typography } from "@material-ui/core";
import divider from "./divider.png";
import manPhoto from "./man.jpeg";
import womanPhoto from "./woman.jpeg";
import "./Party.css";

function Party() {
    return (
        <div className="party-div">
            <header className="party-header">
                <Typography
                    variant="h2"
                    style={{ fontFamily: "Fairplay Display" }}
                >
                    Wedding Party
                </Typography>
                <img
                    src={divider}
                    alt="Divider"
                    style={{ width: "20%", padding: "15px" }}
                ></img>
            </header>
            <div className="party-grid">
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                    style={{ width: "70%", margin: "auto" }}
                >
                    <Grid item xs={6}>
                        <img src={manPhoto} className="party-img"></img>
                        <Typography
                            variant="h4"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Spencer Holt
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Best Man
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={womanPhoto} className="party-img"></img>
                        <Typography
                            variant="h4"
                            style={{ fontFamily: "Fairplay Display" }}
                            className="person-text"
                        >
                            Brrap Brrap 2
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Boop
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={manPhoto} className="party-img"></img>
                        <Typography
                            variant="h4"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Brrap Brrap 1
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Boop
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={womanPhoto} className="party-img"></img>
                        <Typography
                            variant="h4"
                            style={{ fontFamily: "Fairplay Display" }}
                            className="person-text"
                        >
                            Brrap Brrap 2
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Boop
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={manPhoto} className="party-img"></img>
                        <Typography
                            variant="h4"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Brrap Brrap 1
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Boop
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={womanPhoto} className="party-img"></img>
                        <Typography
                            variant="h4"
                            style={{ fontFamily: "Fairplay Display" }}
                            className="person-text"
                        >
                            Brrap Brrap 2
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Boop
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={manPhoto} className="party-img"></img>
                        <Typography
                            variant="h4"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Brrap Brrap 1
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Boop
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={womanPhoto} className="party-img"></img>
                        <Typography
                            variant="h4"
                            style={{ fontFamily: "Fairplay Display" }}
                            className="person-text"
                        >
                            Brrap Brrap 2
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Boop
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={manPhoto} className="party-img"></img>
                        <Typography
                            variant="h4"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Brrap Brrap 1
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Boop
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={womanPhoto} className="party-img"></img>
                        <Typography
                            variant="h4"
                            style={{ fontFamily: "Fairplay Display" }}
                            className="person-text"
                        >
                            Brrap Brrap 2
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{ fontFamily: "Fairplay Display" }}
                        >
                            Boop
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Party;
