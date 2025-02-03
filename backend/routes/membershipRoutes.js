const express = require("express");
const {
  getMembership,
  addMembership,
  getAllMemberships,
} = require("../controllers/membershipController");

const router = express.Router();

router.get("/:user_id", getMembership);
router.post("/add", addMembership);
router.post("/all", getAllMemberships);

module.exports = router;
