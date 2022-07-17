import { Grid, Button, Typography } from "@material-ui/core";
import divider from "../assets/images/divider.png";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import manPhoto from "../assets/images/man.jpeg";
import womanPhoto from "../assets/images/woman.jpeg";
import "./Events.css";

function Events() {
  return (
    <div className="events-div">
      <header className="events-header">
        <Typography variant="h2" style={{ fontFamily: "Fairplay Display" }}>
          Itenerary
        </Typography>
        <img
          src={divider}
          alt="Divider"
          style={{ width: "20%", padding: "15px" }}
        ></img>
      </header>
      <div className="event-grid">
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 1, md: 1 }}
          style={{ width: "90%", margin: "auto" }}
        >
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            direction="column"
            display="flex"
          >
            <Typography variant="h3" style={{ fontFamily: "Fairplay Display" }}>
              Welcome Dinner
            </Typography>
            <Typography variant="h5" style={{ fontFamily: "Fairplay Display" }}>
              Friday, June 7, 2019
            </Typography>
            <Typography variant="h5" style={{ fontFamily: "Fairplay Display" }}>
              8:00 PM
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            direction="column"
            display="flex"
          >
            <LocalBarIcon style={{ margin: "auto", fontSize: "100" }} />
            <Typography
              variant="h5"
              style={{ fontFamily: "Fairplay Display" }}
              className="person-text"
            >
              Fairmont San Francisco <br />
              950 Mason St <br />
              San Francisco, CA 94108
            </Typography>
            <br />
            <Button
              variant="outlined"
              style={{ width: "30%", margin: "auto" }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/101+Hudson+St,+Jersey+City,+NJ+07302/@40.7160775,-74.0372538,17z/data=!3m1!4b1!4m5!3m4!1s0x89c252e3564b6db7:0x60be1eac72163cad!8m2!3d40.7160735!4d-74.0350651",
                  "_blank"
                )
              }
            >
              View on Map
            </Button>
          </Grid>
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            direction="column"
            display="flex"
          >
            <Typography variant="h3" style={{ fontFamily: "Fairplay Display" }}>
              Welcome Dinner
            </Typography>
            <Typography variant="h5" style={{ fontFamily: "Fairplay Display" }}>
              Friday, June 7, 2019
            </Typography>
            <Typography variant="h5" style={{ fontFamily: "Fairplay Display" }}>
              8:00 PM
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            direction="column"
            display="flex"
          >
            <LocalBarIcon style={{ margin: "auto", fontSize: "100" }} />
            <Typography
              variant="h5"
              style={{ fontFamily: "Fairplay Display" }}
              className="person-text"
            >
              Fairmont San Francisco <br />
              950 Mason St <br />
              San Francisco, CA 94108
            </Typography>
            <br />
            <Button
              variant="outlined"
              style={{ width: "30%", margin: "auto" }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/101+Hudson+St,+Jersey+City,+NJ+07302/@40.7160775,-74.0372538,17z/data=!3m1!4b1!4m5!3m4!1s0x89c252e3564b6db7:0x60be1eac72163cad!8m2!3d40.7160735!4d-74.0350651",
                  "_blank"
                )
              }
            >
              View on Map
            </Button>
          </Grid>
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            direction="column"
            display="flex"
          >
            <Typography variant="h3" style={{ fontFamily: "Fairplay Display" }}>
              Welcome Dinner
            </Typography>
            <Typography variant="h5" style={{ fontFamily: "Fairplay Display" }}>
              Friday, June 7, 2019
            </Typography>
            <Typography variant="h5" style={{ fontFamily: "Fairplay Display" }}>
              8:00 PM
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            direction="column"
            display="flex"
          >
            <LocalBarIcon style={{ margin: "auto", fontSize: "100" }} />
            <Typography
              variant="h5"
              style={{ fontFamily: "Fairplay Display" }}
              className="person-text"
            >
              Fairmont San Francisco <br />
              950 Mason St <br />
              San Francisco, CA 94108
            </Typography>
            <br />
            <Button
              variant="outlined"
              style={{ width: "30%", margin: "auto" }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/101+Hudson+St,+Jersey+City,+NJ+07302/@40.7160775,-74.0372538,17z/data=!3m1!4b1!4m5!3m4!1s0x89c252e3564b6db7:0x60be1eac72163cad!8m2!3d40.7160735!4d-74.0350651",
                  "_blank"
                )
              }
            >
              View on Map
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Events;
