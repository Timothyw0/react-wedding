const changeLanguage = (language) => ({
  type: "change",
  payload: {
    language: language,
  },
});

module.exports = { changeLanguage };
