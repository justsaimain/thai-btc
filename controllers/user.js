const { default: axios } = require("axios");
const moment = require("moment");
const ThreeD = require("../models/ThreeD");
const TwoD = require("../models/TwoD");
module.exports.getIndex = async (req, res) => {
  res.render("index", { moment });
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
