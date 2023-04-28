import React, { memo } from "react";
import back from "../../assets/images/404_back.jpeg";
import { useLanguageSelector } from "../../hooks/useLanguageSelector";

const NotFound = () => {
  const { textLang } = useLanguageSelector("404");

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

export default memo(NotFound);
