const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema(
  {
    team1: { type: String, required: true, trim: true },
    team2: { type: String, required: true, trim: true },
    match_date: { type: String, required: true },
    venue: { type: String },
    format: {
      type: String,
      required: true,
      enum: ['Test', 'ODI', 'T20'],
    },
    result: { type: String },
    winner: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Match', MatchSchema);
