module.exports.adminMiddleware = (req, res, next) => {
  const localStorage = require("localStorage");
  const jwt = require("jsonwebtoken");
  const dotenv = require("dotenv");
  dotenv.config();
  const jwtKey = process.env.TOKEN_SECRET;
  const token = localStorage.getItem("token");

  if (!token) {
    return res.redirect("/panel/login");
  }

  jwt.verify(token, jwtKey, (err, user) => {
    if (err) return res.redirect("/panel/login");
    next();
  });
};
