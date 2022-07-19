import React, { useState } from "react";
import { useSelector } from "react-redux";
import { englishText404, chineseText404 } from "../assets/data/translations";
import back from "../assets/images/404_back.jpeg";

const NotFound = () => {
  const language = useSelector((state) => state.language.language);

  let textLang;
  if (language === "En") textLang = englishText404;
  else if (language === "Zh") textLang = chineseText404;

  return (
    <div
      className="not-found"
      style={{
        backgroundImage: `url('${back}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <h1>{textLang.text}</h1>
    </div>
  );
};

export default NotFound;
