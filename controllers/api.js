const { getModData, scrapeData, getBTCLive, getHoliday } = require("../helper");
const TwoD = require("../models/TwoD");
const moment = require("moment");
const Modern = require("../models/Modern");
const ThreeD = require("../models/ThreeD");

module.exports.getLive = async (req, res) => {
  const data = await scrapeData();
  res.send(data);
};

module.exports.getMod = async (req, res) => {
  const data = await getModData();
  res.send(data);
};

module.exports.getBTCLive = async (req, res) => {
  const data = await getBTCLive();
  res.send(data);
};

module.exports.getTodayResult = async (req, res) => {
  const today = moment(new Date()).format("YYYY-MM-DD");
  const twoD = await TwoD.find({
    date: today,
  }).sort({
    time: 1,
  });
  const modNet = await Modern.find({
    date: today,
  }).sort({
    time: -1,
  });

  const data = {
    twoD,
    modNet,
  };
  res.send(data);
};

module.exports.getYesterdayResult = async (req, res) => {
  const today = moment(new Date()).subtract(2, "days").format("YYYY-MM-DD");
  const twoD = await TwoD.find({
    date: today,
  }).sort({
    time: 1,
  });
  const modNet = await Modern.find({
    date: today,
  }).sort({
    time: -1,
  });

  const data = {
    twoD,
    modNet,
  };
  res.send(data);
};

module.exports.getTwoDHistory = async (req, res) => {
  const twoD = await TwoD.find({}).sort({
    date: -1,
    time: -1,
  });
  res.send(twoD);
};

module.exports.getThreeDHistory = async (req, res) => {
  const threeD = await ThreeD.find({}).sort({
    date: -1,
  });
  res.send(threeD);
};

module.exports.getHoliday = async (req, res) => {
  try {
    const holiday = await getHoliday();
    res.send(holiday);
  } catch (e) {
    console.log(e);
  }
};
