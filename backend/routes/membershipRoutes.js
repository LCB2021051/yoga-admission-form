const express = require("express");
const {
  getMembership,
  addMembership,
} = require("../controllers/membershipController");

const router = express.Router();

router.get("/:user_id", getMembership);
router.post("/add", addMembership);

module.exports = router;
