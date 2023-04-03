// Points model
const pointsSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  matches: {
    type: Array,
  },
});

const Points = mongoose.model("Points", pointsSchema);
