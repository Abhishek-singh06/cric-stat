const Player = require('../models/Player');
const Statistic = require('../models/Statistic');

// GET all players
const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: players });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single player by ID
const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ success: false, message: 'Player not found' });
    res.status(200).json({ success: true, data: player });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST create player
const createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json({ success: true, data: player });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT update player
const updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!player) return res.status(404).json({ success: false, message: 'Player not found' });
    res.status(200).json({ success: true, data: player });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE player (cascades to that player's statistics)
const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ success: false, message: 'Player not found' });
    // Remove orphaned statistics tied to this player.
    await Statistic.deleteMany({ player_id: req.params.id });
    res.status(200).json({ success: true, message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer };
