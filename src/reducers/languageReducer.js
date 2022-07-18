const initialState = {
  language: "En",
};
const languageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let copyState = state;
  switch (type) {
    case "change":
      console.log("hello");
      if (payload.language === "Zh") {
        copyState.language = "Zh";
      } else {
        copyState.language = "En";
      }
      return copyState;
    default:
      return state;
  }
};

export default languageReducer;
