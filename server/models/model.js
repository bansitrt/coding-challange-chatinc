// Team model
const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  matches: {
    type: Array,
    required: true,
  },
});

const League = mongoose.model("Leagues", leagueSchema);

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Team = mongoose.model("Team", teamSchema);

// Match model
const matchSchema = new mongoose.Schema({
  firstTeam: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  secondTeam: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
});

const Match = mongoose.model("Match", matchSchema);

module.exports = {
  Team,
  Match,

  League,
};
