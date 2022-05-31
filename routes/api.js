const { Router } = require("express");
const express = require("express");
const {
  getLive,
  getMod,
  getBTCLive,
  getTodayResult,
  getTwoDHistory,
  getYesterdayResult,
  getHoliday,
  getThreeDHistory,
} = require("../controllers/api");
const router = Router();

router.use(express.static("public"));

router.get("/live", getLive);
router.get("/today", getTodayResult);
router.get("/yesterday", getYesterdayResult);
router.get("/mod", getMod);
router.get("/2d", getTwoDHistory);
router.get("/3d", getThreeDHistory);
router.get("/btc", getBTCLive);
router.get("/holiday", getHoliday);

module.exports = router;
