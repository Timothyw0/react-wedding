import { Grid, Typography } from "@material-ui/core";
import { Box, Card, CardContent } from "@material-ui/core";
import React, { memo, useState, useEffect } from "react";
import { partyImages, partyOrder } from "../../assets/images/party/party";
import back from "../../assets/images/qa_back.jpeg";
import divider from "../../assets/images/divider.png";
import "./Party.css";
import { useLanguageSelector } from "../../hooks/useLanguageSelector";

function Party() {
  const [width, setWidth] = useState(window.innerWidth);
  const { textLang } = useLanguageSelector("party");

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

  let partyInfo = (
    <>
      <header className="party-header">
        <Typography variant="h2" style={{ fontFamily: "Fairplay Display" }}>
          {textLang.party}
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
          style={{ width: isMobile ? "90%" : "70%", margin: "auto" }}
        >
          {partyOrder?.map((row) => {
            const name1 = row?.[0]?.name;
            const text1 = row?.[0]?.text;
            const image1 = row?.[0]?.image;
            const name2 = row?.[1]?.name;
            const text2 = row?.[1]?.text;
            const image2 = row?.[1]?.image;

            return (
              <>
                <Grid item xs={6}>
                  {name1 && (
                    <>
                      <img
                        src={partyImages?.[image1]}
                        className="party-img"
                        alt={name1}
                        referrerpolicy="no-referrer"
                      />
                      <Typography
                        variant="h4"
                        style={{ fontFamily: "Fairplay Display" }}
                      >
                        {name1}
                      </Typography>
                      <Typography
                        variant="h6"
                        style={{ fontFamily: "Fairplay Display" }}
                      >
                        {textLang?.[text1]}
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <>
                    <img
                      src={partyImages?.[image2]}
                      className="party-img"
                      alt={name2}
                      referrerpolicy="no-referrer"
                    />
                    <Typography
                      variant="h4"
                      style={{ fontFamily: "Fairplay Display" }}
                    >
                      {name2}
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{ fontFamily: "Fairplay Display" }}
                    >
                      {textLang?.[text2]}
                    </Typography>
                  </>
                </Grid>
              </>
            );
          })}
        </Grid>
      </div>
    </>
  );

  return (
    <div
      className="party-div"
      style={{
        backgroundImage: `url(${back})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
        paddingBottom: "100px",
      }}
    >
      {isMobile ? (
        partyInfo
      ) : (
        <Box sx={{ width: "70%", margin: "auto" }} className="party-box">
          <Card
            className="rsvp-card"
            variant="outlined"
            style={{ alignItems: "center", display: "flex" }}
          >
            <CardContent style={{ margin: "auto" }}>{partyInfo}</CardContent>
          </Card>
        </Box>
      )}
    </div>
  );
}

export default memo(Party);
