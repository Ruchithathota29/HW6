const express = require("express");
const router = express.Router();
const Player = require("../models/playerModel");
const mongoose = require("mongoose");

// CREATE (POST)
router.post("/", async (req, res) => {
  const { name, number, position } = req.body;
  try {
    const player = await Player.create({ name, number, position });
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ ALL (GET)
router.get("/", async (req, res) => {
  const players = await Player.find();
  res.status(200).json(players);
});

// READ ONE (GET by ID)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Player not found" });
  }
  const player = await Player.findById(id);
  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }
  res.status(200).json(player);
});

// UPDATE (PATCH)
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Player not found" });
  }
  const player = await Player.findByIdAndUpdate(id, req.body, { new: true });
  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }
  res.status(200).json(player);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Player not found" });
  }
  const player = await Player.findByIdAndDelete(id);
  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }
  res.status(200).json({ message: "Player deleted successfully" });
});

module.exports = router;
