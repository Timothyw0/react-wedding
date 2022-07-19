const englishTextPassword = {
  welcome: "Welcome!",
  pass: "Please enter the password to continue:",
  incorrect: "The password is incorrect! Please try again.",
  enter: "Enter",
};

const chineseTextPassword = {
  welcome: "欢迎!",
  pass: "请输入密码以继续",
  incorrect: "密码不正确！ 请再试一次。",
  enter: "进入",
};

const englishTextHome = {
  tim: "Timothy Wang",
  madeleine: "Madeleine Herring",
  date: "September 23, 2023",
};

const chineseTextHome = {
  tim: "王大明",
  madeleine: "沛欣",
  date: "2023 年 9 月 23 日",
};

const englishTextNav = {
  pages: ["Home", "About Us", "Wedding Party", "Events", "Travel", "RSVP"],
  pageLinks: {
    Home: "/",
    "About Us": "/about",
    "Wedding Party": "/party",
    Events: "/events",
    Travel: "/travel",
    RSVP: "/rsvp",
  },
  changeLanguage: "Change Language",
  languageMenu: ["English", "中文"],
};

const chineseTextNav = {
  pages: ["主页", "我们", "婚礼派对", "事件", "旅行", "敬请回复"],
  pageLinks: {
    主页: "/",
    我们: "/about",
    婚礼派对: "/party",
    事件: "/events",
    旅行: "/travel",
    敬请回复: "/rsvp",
  },
  changeLanguage: "改变语言",
  languageMenu: ["English", "中文"],
};

const englishTextDial = {
  email: "Email Us",
  text: "Text Us",
  code: "Check Out My Code!",
};

const chineseTextDial = {
  email: "沛欣",
  text: "短信",
  code: "我的代码!",
};

const englishText404 = {
  text: "Page not found! Please choose a link from the topbar.",
};

const chineseText404 = {
  text: "网页未找到！ 请从顶部栏中选择一个链接。",
};

const englishTextTravel = {
  header:
    "We have reserved hotel rooms at the Hampton Inn Doylestown - Warrington",
  addressText: "Address",
  address: "1570 Easton Rd, Warrington, PA 18976",
  phoneText: "Phone",
  phone: "(215) 343-8400",
  venue: "Wedding Venue",
  hotel: "Hampton Inn",
};

const chineseTextTravel = {
  header: "我们在 Hampton Inn Doylestown - Warrington 预订了酒店房间",
  addressText: "地址",
  address: "1570 Easton Rd, Warrington, PA 18976",
  phoneText: "电话",
  phone: "(215) 343-8400",
  venue: "婚礼场地",
  hotel: "酒店",
};

module.exports = {
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
};
