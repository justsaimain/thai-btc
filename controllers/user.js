const { default: axios } = require("axios");
const moment = require("moment");
const ThreeD = require("../models/ThreeD");
const TwoD = require("../models/TwoD");
const dotenv = require("dotenv");
const BTC = require("../models/BTC");
dotenv.config();
const baseURL = process.env.BASE_URL;
module.exports.getIndex = async (req, res) => {
  const rToday = await axios.get(`${baseURL}/api/today`);
  const rYesterday = await axios.get(`${baseURL}/api/yesterday`);
  const today = rToday.data;
  const yesterday = rYesterday.data;

  res.render("index", { moment, yesterday });
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
