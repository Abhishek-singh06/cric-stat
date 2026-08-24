const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    role: {
      type: String,
      required: true,
      enum: ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'],
    },
    age: { type: Number },
    image_url: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Player', PlayerSchema);
