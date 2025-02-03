const { Batch, User } = require("../models");

// ✅ Insert default batches
exports.insertBatches = async (req, res) => {
  try {
    const batches = [
      { timing: "6-7 AM" },
      { timing: "7-8 AM" },
      { timing: "8-9 AM" },
      { timing: "5-6 PM" },
    ];

    for (const batch of batches) {
      const exists = await Batch.findOne({ where: { timing: batch.timing } });
      if (!exists) {
        await Batch.create(batch);
      }
    }

    res
      .status(201)
      .json({ message: "✅ Default batches inserted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error inserting batches", error });
  }
};

// ✅ Get all batches
exports.getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.findAll();
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching batches", error });
  }
};

// ✅ Add a new batch
exports.addBatch = async (req, res) => {
  const { timing } = req.body;

  if (!timing) {
    return res.status(400).json({ message: "❌ Batch timing is required." });
  }

  try {
    const existingBatch = await Batch.findOne({ where: { timing } });
    if (existingBatch) {
      return res
        .status(400)
        .json({ message: "❌ Batch timing already exists." });
    }

    const batch = await Batch.create({ timing });
    res.status(201).json({ message: "✅ Batch added successfully!", batch });
  } catch (error) {
    res.status(500).json({ message: "❌ Error adding batch", error });
  }
};

// ✅ Delete a batch by ID
exports.deleteBatch = async (req, res) => {
  const { batch_id } = req.params;

  try {
    const batch = await Batch.findByPk(batch_id);
    if (!batch) {
      return res.status(404).json({ message: "❌ Batch not found." });
    }

    const usersInBatch = await User.findOne({ where: { batch_id } });
    if (usersInBatch) {
      return res
        .status(400)
        .json({ message: "❌ Cannot delete batch. Users are assigned to it." });
    }

    await batch.destroy();
    res.status(200).json({ message: "✅ Batch deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error deleting batch", error });
  }
};
