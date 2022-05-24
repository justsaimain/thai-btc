const localStorage = require("localStorage");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.TOKEN_SECRET;
const jwtExpirySeconds = 300; // Seconds
const moment = require("moment");
const session = require("express-session");

const Admin = require("../models/Admin");
const Modern = require("../models/Modern");
const ThreeD = require("../models/ThreeD");
const BTCOption = require("../models/BTCOption");
const TwoDOption = require("../models/TwoDOption");

module.exports.getLogin = (req, res) => {
  res.render("admin/login");
};

module.exports.postLogin = (req, res) => {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.removeItem("token");
  }

  const { username, password } = req.body;

  Admin.find({}, {}, {}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (username !== "" || password !== "") {
        const filtered = result.filter((admin) => admin.username === username);
        if (filtered.length > 0) {
          if (filtered[0].password === password) {
            const token = jwt.sign({ username }, jwtKey, {
              algorithm: "HS256",
              expiresIn: jwtExpirySeconds,
            });
            localStorage.setItem("token", token);
            res.redirect("/panel");
          } else {
            localStorage.removeItem("token");
            res.redirect("/panel/login");
          }
        } else {
          localStorage.removeItem("token");
          res.redirect("/panel/login");
        }
      } else {
        localStorage.removeItem("token");
        res.redirect("/panel/login");
      }
    }
  });
};

module.exports.logout = async (req, res) => {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.removeItem("token");
  }
  res.redirect("/panel");
};

module.exports.getPanel = async (req, res) => {
  const isRunning = await TwoDOption.find({});
  res.render("admin/index", { isRunning: isRunning[0].running });
};

module.exports.getMod = async (req, res) => {
  res.render("admin/modern", { moment });
};

module.exports.postMod = async (req, res) => {
  const { mod, net, time } = req.body;
  const modernData = new Modern({
    mod,
    net,
    time,
    date: moment(new Date()).format("YYYY-MM-DD"),
  });

  modernData
    .save()
    .then((result) => {
      console.log("✅ Mod & Net Data saved to database", result);
    })
    .catch((error) => {
      console.log("❌ Mod & Net Data saving error", error);
    });

  res.redirect("/panel/modern");
};

module.exports.getThreeD = async (req, res) => {
  res.render("admin/three_d", { moment });
};

module.exports.postThreeD = async (req, res) => {
  const { result, date } = req.body;
  const threeDData = new ThreeD({
    result,
    date,
  });

  threeDData
    .save()
    .then((result) => {
      console.log("✅ 3D Data saved to database", result);
    })
    .catch((error) => {
      console.log("❌ 3D Data saving error", error);
    });

  res.redirect("/panel/3d");
};

module.exports.getBTC = async (req, res) => {
  res.render("admin/btc", { moment });
};

module.exports.postBTC = async (req, res) => {
  const { set, value } = req.body;
  const btcData = new BTCOption({
    set,
    value,
  });

  btcData
    .save()
    .then((result) => {
      console.log("✅ BTC Option Data saved to database", result);
    })
    .catch((error) => {
      console.log("❌ BTC Option Data saving error", error);
    });

  res.redirect("/panel/btc");
};

module.exports.toggle2DStatus = async (req, res) => {};
