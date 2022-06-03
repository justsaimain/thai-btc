const { default: axios } = require("axios");
const moment = require("moment");
const ThreeD = require("../models/ThreeD");
const TwoD = require("../models/TwoD");
const dotenv = require("dotenv");
const BTC = require("../models/BTC");
const { getHoliday } = require("../helper");
dotenv.config();
const baseURL = process.env.BASE_URL;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const today = new Date();
const todayDate =
  today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear();
async function isHoliday(todayDate) {
  const holiday = await getHoliday();
  const hasHolidayValue = holiday.some((d) => d.date === todayDate);
  const whyHoliday = holiday.filter((d) => d.date === todayDate);
  return {
    hasHolidayValue,
    whyHoliday,
  };
}

module.exports.getIndex = async (req, res) => {
  isHoliday(todayDate).then((holi) => {
    res.render("index", {
      holiday: holi?.hasHolidayValue,
      whyholiday: holi.whyHoliday[0]?.reason,
      moment,
    });
  });
};

module.exports.getBTCPage = async (req, res) => {
  res.render("btc");
};

module.exports.getTwoDHistoryPage = async (req, res) => {
  const data = await TwoD.find({}).sort({
    date: -1,
    time: -1,
  });
  res.render("twod", { data });
};

module.exports.getThreeDPage = async (req, res) => {
  const data = await ThreeD.find({}).sort({
    date: -1,
  });

  const latest = data.shift();
  res.render("threed", { data, latest, moment });
};

module.exports.getBTCResultPage = async (req, res) => {
  const data = await BTC.find({}).sort({
    date: -1,
    time: -1,
  });
  res.render("btcres", { data });
};
