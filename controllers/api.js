const { getModData, scrapeData, getBTCLive } = require("../helper");

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
