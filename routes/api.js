const { Router } = require("express");
const express = require("express");
const { getLive, getMod, getBTCLive } = require("../controllers/api");
const router = Router();

router.use(express.static("public"));

router.get("/live", getLive);
router.get("/mod", getMod);
router.get("/btc", getBTCLive);

module.exports = router;
