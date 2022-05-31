const { Router } = require("express");
const express = require("express");

const router = Router();

const {
  getPanel,
  postMod,
  getTwoD,
  logout,
  getMod,
  postLogin,
  getLogin,
  getThreeD,
  postThreeD,
  getBTC,
  postBTC,
  toggle2DStatus,
} = require("../controllers/admin");

const { adminMiddleware } = require("../middleware");

router.use(express.static("public/admin"));

router.get("/login", getLogin);
router.post("/login", postLogin);

router.use(adminMiddleware);

router.get("/", getPanel);
router.get("/2d", getTwoD);
router.get("/modern", getMod);
router.post("/modern", postMod);
router.get("/3d", getThreeD);
router.post("/3d", postThreeD);
router.get("/btc", getBTC);
router.post("/btc", postBTC);

router.post("/2d/toggle", toggle2DStatus);

router.post("/logout", logout);

module.exports = router;
