const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
  userScore: {
    type: Number,
    required: true,

  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
});

const Score = model('Score', scoreSchema);

module.exports = Score;
