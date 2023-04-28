import {
  englishTextPassword,
  chineseTextPassword,
  englishTextHome,
  chineseTextHome,
  englishTextNav,
  chineseTextNav,
  englishTextDial,
  chineseTextDial,
  englishText404,
  chineseText404,
  englishTextTravel,
  chineseTextTravel,
  englishTextStory,
  chineseTextStory,
  englishTextRegistry,
  chineseTextRegistry,
  englishTextQA,
  chineseTextQA,
  englishTextParty,
  chineseTextParty,
  englishTextRSVP,
  chineseTextRSVP,
  englishTextEvents,
  chineseTextEvents,
} from "../assets/data/translations";
import { useSelector } from "react-redux";

export const useLanguageSelector = (page) => {
  const pageMapping = {
    password: [englishTextPassword, chineseTextPassword],
    home: [englishTextHome, chineseTextHome],
    nav: [englishTextNav, chineseTextNav],
    dial: [englishTextDial, chineseTextDial],
    404: [englishText404, chineseText404],
    travel: [englishTextTravel, chineseTextTravel],
    story: [englishTextStory, chineseTextStory],
    registry: [englishTextRegistry, chineseTextRegistry],
    qa: [englishTextQA, chineseTextQA],
    party: [englishTextParty, chineseTextParty],
    rsvp: [englishTextRSVP, chineseTextRSVP],
    events: [englishTextEvents, chineseTextEvents],
  };
  const language = useSelector((state) => state.language.language);
  const textLang =
    language === "En" ? pageMapping[page][0] : pageMapping[page][1];

  return { textLang };
};
