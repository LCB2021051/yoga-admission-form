const express = require("express");
const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.get("/all", getAllUsers);
router.get("/:user_id", getUserById);
router.put("/update/:user_id", updateUser);
router.delete("/delete/:user_id", deleteUser);

module.exports = router;
