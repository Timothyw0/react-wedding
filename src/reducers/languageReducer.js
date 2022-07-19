const initialState = {
  language: "En",
};
const languageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let newLang;
  switch (type) {
    case "change":
      if (payload.language === "Zh") {
        newLang = "Zh";
      } else {
        newLang = "En";
      }
      return { language: newLang };
    default:
      return state;
  }
};

export default languageReducer;
