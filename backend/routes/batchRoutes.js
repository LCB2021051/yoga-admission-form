const express = require("express");
const {
  insertBatches,
  getAllBatches,
  addBatch,
  deleteBatch,
} = require("../controllers/batchController");

const router = express.Router();

router.post("/add-batches", insertBatches);
router.get("/all", getAllBatches);
router.post("/add", addBatch);
router.delete("/delete/:batch_id", deleteBatch);

module.exports = router;
