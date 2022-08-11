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
  location: "The Warrington Country Club",
  city: "Warrington, PA",
};

const chineseTextHome = {
  tim: "王大明",
  madeleine: "沛欣",
  date: "2023 年 9 月 23 日",
  location: "The Warrington Country Club",
  city: "Warrington, PA",
};

const englishTextNav = {
  pages: [
    "Home",
    "Our Story",
    "Wedding Party",
    "Events",
    "Accommodations",
    "RSVP",
    "Registry",
    "Q & A",
  ],
  pageLinks: {
    Home: "/",
    "Our Story": "/story",
    "Wedding Party": "/party",
    Events: "/events",
    Accommodations: "/accommodations",
    RSVP: "/rsvp",
    Registry: "/registry",
    "Q & A": "/questions",
  },
  changeLanguage: "Change Language",
  languageMenu: ["English", "中文"],
};

const chineseTextNav = {
  pages: [
    "主页",
    "故事",
    "婚礼派对",
    "事件",
    "住宿",
    "敬请回复",
    "礼物登记处",
    "问答",
  ],
  pageLinks: {
    主页: "/",
    故事: "/story",
    婚礼派对: "/party",
    事件: "/events",
    住宿: "/accommodations",
    敬请回复: "/rsvp",
    礼物登记处: "/registry",
    问答: "/questions",
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
  header: "Hampton Inn Doylestown - Warrington",
  addressText: "Address",
  address: "1570 Easton Rd, Warrington, PA 18976",
  phoneText: "Phone",
  phone: "(215) 343-8400",
  venue: "Wedding Venue",
  hotel: "Hampton Inn",
  hotelURL: "https://www.hilton.com/en/hotels/dylpahx-hampton-doylestown/",
  hotelText: "Hotel Website",
};

const chineseTextTravel = {
  header: "Hampton Inn Doylestown - Warrington",
  addressText: "地址",
  address: "1570 Easton Rd, Warrington, PA 18976",
  phoneText: "电话",
  phone: "(215) 343-8400",
  venue: "婚礼场地",
  hotel: "酒店",
  hotelURL: "https://www.hilton.com/en/hotels/dylpahx-hampton-doylestown/",
  hotelText: "酒店网站",
};

const englishTextStory = {
  header: "Our Story",
  story: `Tim and Madeleine met in 2019 during their senior year of college. Tim studied at RPI and Madeleine studied at Russell Sage College, both in Troy, NY. They met at a bar called “The Ruck” and hit it off from there. After graduation, Tim started his job in Jersey City, while Madeleine attended graduate school at Fordham University. Three years later... on March 25, 2022 Tim proposed in Boston, Massachusetts. They currently live in Jersey City, and are as happy as ever!`,
};

const chineseTextStory = {
  header: "我们的故事",
  story:
    "我们于 2019 年在纽约州特洛伊相遇。 Tim 在 RPI 上学，Madeleine 在 Russell Sage 学院上学。 我们在一家名为“The Ruck”的酒吧相遇，并从那里一拍即合。 毕业后，Tim 在泽西城开始了他的工作，而 Madeleine 则在福特汉姆大学开始了研究生学习。 三年后……2022 年 3 月 25 日，Tim 在马萨诸塞州波士顿求婚。 我们现在住在泽西城，在一起很开心！",
};

const englishTextRegistry = {
  registryURL: "https://www.zola.com/registry/madeleineandtimothy2023",
  header: "Thank you for thinking of us, please find our registry below!",
  registryText: "Registry",
};

const chineseTextRegistry = {
  registryURL: "https://www.zola.com/registry/madeleineandtimothy2023",
  header: "感谢您考虑我们，请在下面找到我们的礼物注册表！",
  registryText: "礼物登记处",
};

const englishTextQA = {
  questions: [
    "What is the dress code?",
    "What is the parking situation?",
    "I have dietary restrictions, how should I let you know?",
    "What hotel should I book?",
    "What is the best way to contact you?",
    "Will there be milk?",
  ],
  answers: [
    "The dress code for our wedding is semi-formal/cocktail attire",
    "There is complimentary parking on-site, Ubers/Lyfts are available, and the Hampton Inn is only a 3 minute drive away",
    "Please include any dietary restrictions in the RSVP",
    "We have reserved rooms at the Hampton Inn Doylestown nearby, you can check out their website",
    "You can text Madeleine at (845)-820-3221 or Tim at (732)-939-3051",
    "Yes, milk will be supplied for Pierre",
  ],
  hereText: "here",
};

const chineseTextQA = {
  questions: [
    "着装要求是什么？",
    "停车情况如何？",
    "我有饮食限制，我应该怎么告诉你？",
    "我应该预订什么酒店？",
    "与您联系的最佳方式是什么？",
  ],
  answers: [
    "我们婚礼的着装要求是半正式/鸡尾酒装",
    "酒店内提供免费停车场，提供 Ubers/Lyfts，距离 Hampton Inn 仅 3 分钟车程",
    "请在回复中包含任何饮食限制",
    "我们在附近的 Hampton Inn Doylestown 预订了房间，您可以查看他们的网站",
    "您可以拨打 (845)-820-3221 给 Madeleine 发短信，或者拨打 (732)-939-3051 给 Tim",
  ],
  hereText: "这里",
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
  englishTextStory,
  chineseTextStory,
  englishTextRegistry,
  chineseTextRegistry,
  englishTextQA,
  chineseTextQA,
};
