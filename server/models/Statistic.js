const mongoose = require('mongoose');

const StatisticSchema = new mongoose.Schema(
  {
    player_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      required: true,
    },
    match_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
      required: true,
    },
    runs: { type: Number, default: 0 },
    balls_faced: { type: Number, default: 0 },
    fours: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    overs_bowled: { type: Number, default: 0 },
    runs_conceded: { type: Number, default: 0 },
    catches: { type: Number, default: 0 },
    is_out: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Statistic', StatisticSchema);
