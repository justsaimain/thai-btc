const { Router } = require("express");
const express = require("express");
const { getIndex } = require("../controllers/user");
const router = Router();

router.use(express.static("public"));

router.get("/", getIndex);

module.exports = router;
