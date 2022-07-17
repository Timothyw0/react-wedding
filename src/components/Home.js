import React from "react";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import homePhoto from "../assets/images/home_photo.jpeg";
import divider from "../assets/images/divider.png";

const Home = () => {
  return (
    <section
      id="home"
      className="home-page"
      style={{
        backgroundImage: `url('${homePhoto}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ width: "40%", margin: "auto" }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3" style={{ fontFamily: "Fairplay Display" }}>
              A Brrap & A Brrap
            </Typography>
            <img
              src={divider}
              alt="Divider"
              style={{ width: "80%", padding: "15px" }}
            ></img>
            <Typography variant="h6" style={{ fontFamily: "Fairplay Display" }}>
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </section>
  );
};

export default Home;
