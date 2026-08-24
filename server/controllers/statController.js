const Statistic = require('../models/Statistic');

// GET all statistics (with player & match info populated)
const getAllStats = async (req, res) => {
  try {
    const stats = await Statistic.find()
      .populate('player_id', 'name country role')
      .populate('match_id', 'team1 team2 match_date format venue')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET stats by player ID
const getStatsByPlayer = async (req, res) => {
  try {
    const stats = await Statistic.find({ player_id: req.params.playerId })
      .populate('match_id', 'team1 team2 match_date format venue');
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST add stat entry
const createStat = async (req, res) => {
  try {
    const stat = await Statistic.create(req.body);
    res.status(201).json({ success: true, data: stat });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT update stat
const updateStat = async (req, res) => {
  try {
    const stat = await Statistic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!stat) return res.status(404).json({ success: false, message: 'Stat not found' });
    res.status(200).json({ success: true, data: stat });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE stat
const deleteStat = async (req, res) => {
  try {
    const stat = await Statistic.findByIdAndDelete(req.params.id);
    if (!stat) return res.status(404).json({ success: false, message: 'Stat not found' });
    res.status(200).json({ success: true, message: 'Stat deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllStats, getStatsByPlayer, createStat, updateStat, deleteStat };
