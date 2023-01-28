import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  englishTextQA,
  chineseTextQA,
  englishTextTravel,
} from "../../assets/data/translations";
import { Box, Card } from "@material-ui/core";
import back from "../../assets/images/qa_back.jpeg";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./Questions.css";

const Questions = () => {
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
  const language = useSelector((state) => state.language.language);

  let textLang;
  if (language === "En") textLang = englishTextQA;
  else if (language === "Zh") textLang = chineseTextQA;

  let pageContent = textLang.questions.map((elem, idx) => {
    let answerText;
    if (elem.includes("dietary") && elem.includes("食物")) {
      answerText = (
        <>
          <p>
            {textLang.answers[idx]}{" "}
            <NavLink to="/rsvp">{textLang.rsvpText}</NavLink>
          </p>
        </>
      );
    } else if (elem.includes("hotel") || elem.includes("酒店")) {
      answerText = (
        <>
          <p>
            {textLang.answers[idx]}{" "}
            <a href={englishTextTravel.hotelURL} target="_blank">
              {textLang.hereText} <OpenInNewIcon fontSize="x-small" />
            </a>
          </p>
        </>
      );
    } else {
      answerText = <p>{textLang.answers[idx]}</p>;
    }
    return (
      <>
        <br />
        <h1>{elem}</h1>
        <br />
        {answerText}
        <br />
      </>
    );
  });

  return (
    <div
      className="questions-div"
      style={{
        backgroundImage: `url('${back}')`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        {isMobile ? (
          pageContent
        ) : (
          <Box sx={{ width: "80%", margin: "auto" }} className="questions-box">
            <Card className="rsvp-card" variant="outlined">
              {pageContent}
            </Card>
          </Box>
        )}
      </div>
    </div>
  );
};

export default memo(Questions);
