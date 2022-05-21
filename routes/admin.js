const { Router } = require("express");
const express = require("express");

const router = Router();

const {
  getPanel,
  postMod,
  logout,
  getMod,
  postLogin,
  getLogin,
  getThreeD,
  postThreeD,
} = require("../controllers/admin");

const { adminMiddleware } = require("../middleware");

router.use(express.static("public"));

router.get("/login", getLogin);
router.post("/login", postLogin);

router.use(adminMiddleware);

router.get("/", getPanel);
router.get("/modern", getMod);
router.post("/modern", postMod);
router.get("/3d", getThreeD);
router.post("/3d", postThreeD);

router.post("/logout", logout);

module.exports = router;
