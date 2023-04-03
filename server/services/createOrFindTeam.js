const { Team } = require("../models/model");

module.exports = async function createOrFindTeam(session, team) {
  const existingTeam = await Team.findOne({ name: team.name }).session(session);

  if (existingTeam) {
    return existingTeam._id;
  } else {
    const createdTeam = await Team.create([team], { session });
    return createdTeam[0]._id;
  }
};
