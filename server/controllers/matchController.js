const Match = require('../models/Match');
const Statistic = require('../models/Statistic');

// GET all matches
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({ match_date: -1 });
    res.status(200).json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single match by ID
const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ success: false, message: 'Match not found' });
    res.status(200).json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST create match
const createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json({ success: true, data: match });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT update match
const updateMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!match) return res.status(404).json({ success: false, message: 'Match not found' });
    res.status(200).json({ success: true, data: match });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE match (cascades to statistics recorded for that match)
const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json({ success: false, message: 'Match not found' });
    // Remove orphaned statistics tied to this match.
    await Statistic.deleteMany({ match_id: req.params.id });
    res.status(200).json({ success: true, message: 'Match deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllMatches, getMatchById, createMatch, updateMatch, deleteMatch };
