const express = require("express");
const router = express.Router();
const Player = require("../models/playerModel"); // Importing the Player model
const mongoose = require("mongoose"); // Importing mongoose for ObjectId validation

// POST a new player (Create)
router.post("/", async (req, res) => {
  const { name, number, position, age, weight } = req.body;
  try {
    const player = await Player.create({ name, number, position, age, weight });
    res.status(201).json(player); // Return the created player
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all players (Read)
router.get("/", async (req, res) => {
  try {
    const players = await Player.find(); // Fetch all players from MongoDB
    res.status(200).json(players); // Return all players
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET a single player by ID (Read)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid player ID" });
  }

  try {
    const player = await Player.findById(id); // Find player by ID
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(200).json(player); // Return the player
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH a player's information (Update)
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid player ID" });
  }

  try {
    const player = await Player.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(200).json(player); // Return the updated player
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a player (Delete)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid player ID" });
  }

  try {
    const player = await Player.findOneAndDelete({ _id: id }); // Delete player by ID
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(200).json({ message: "Player deleted successfully", player });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
