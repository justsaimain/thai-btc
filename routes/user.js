const { Router } = require("express");
const express = require("express");
const {
  getIndex,
  getBTCPage,
  getTwoDHistoryPage,
  getThreeDPage,
} = require("../controllers/user");
const router = Router();

router.use(express.static("public"));

router.get("/", getIndex);
router.get("/btc", getBTCPage);
router.get("/2d", getTwoDHistoryPage);
router.get("/3d", getThreeDPage);

module.exports = router;
