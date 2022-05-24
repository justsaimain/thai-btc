// scrape data from set.or.th website

const { default: axios } = require("axios");
const moment = require("moment");
const BTC = require("./models/BTC");
const Modern = require("./models/Modern");
const TwoD = require("./models/TwoD");

module.exports.scrapeData = async () => {
  const axios = require("axios");
  const cheerio = require("cheerio");

  const url =
    "https://classic.set.or.th/mkt/marketsummary.do?language=en&country=US";

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const set = $(
      "#maincontent > div > div:nth-child(3) > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)"
    ).text();

    const value = $(
      "#maincontent > div > div:nth-child(3) > div > div > table > tbody > tr:nth-child(1) > td:nth-child(8)"
    ).text();

    const lastUpdate = $(
      "#maincontent > div > div:nth-child(5) > div:nth-child(1) > div:nth-child(2)"
    )
      .text()
      .replace("\n            * Last Update ", "")
      .replace("\n        ", "");

    const status = $(
      "#maincontent > div > div:nth-child(5) > div:nth-child(1) > div:nth-child(3)"
    )
      .text()
      .replace("\n            Market Status: ", "")
      .replace("\n        ", "");

    const result = set.slice(-1) + value.split(".")[0].slice(-1);
    const saveData = {
      set,
      value,
      result,
      lastUpdate: moment(new Date(lastUpdate)).format("D MMM, hh:mm A"),
      status,
    };
    return saveData;
  } catch (err) {
    console.error(err);
  }
};

module.exports.getModData = async () => {
  const data = await Modern.find({}).sort({ createdAt: -1 });
  return data;
};

module.exports.getBTCLive = async () => {
  const { data } = await axios.get(
    "https://production.api.coindesk.com/v2/tb/price/ticker?assets=BTC"
  );

  const btcData = data.data.BTC;
  const c = btcData.ohlc.c.toFixed(2).slice(2);
  const percent = btcData.change.percent.toFixed(2).replace("-", "");
  const twoD = c.slice(-1) + percent.slice(-1);
  const rData = {
    c,
    percent,
    twoD,
  };

  return rData;
};

module.exports.storeBTCData = async () => {
  const btcLiveData = await this.getBTCLive();
  const btcData = new BTC(btcLiveData);

  btcData
    .save()
    .then((result) => {
      console.log("✅ BTC Data saved to database", result);
    })
    .catch((error) => {
      console.log("❌ BTC Data saving error", error);
    });
};

module.exports.storeTwoDData = async (time) => {
  const scrapedData = await this.scrapeData();
  const twoDData = new TwoD({
    set: scrapedData.set,
    value: scrapedData.value,
    result: scrapedData.result,
    time: time,
    date: moment(new Date()).format("YYYY-MM-DD"),
  });

  twoDData
    .save()
    .then((result) => {
      console.log("✅ 2D Data saved to database", result);
    })
    .catch((error) => {
      console.log("❌ 2D Data saving error", error);
    });
};
