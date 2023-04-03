const { default: mongoose } = require("mongoose");
const { League, Match } = require("../models/model");
const createOrFindTeam = require("./createOrFindTeam");

module.exports = async function createLeagueWithMatches(leagueName, matches) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const leagueMatches = [];

    for (const match of matches) {
      const { firstTeam, secondTeam, date: dateOfMatch } = match;

      const firstTeamId = await createOrFindTeam(session, firstTeam);
      const secondTeamId = await createOrFindTeam(session, secondTeam);

      const matchObj = {
        firstTeam: { id: firstTeamId, score: firstTeam.score },
        secondTeam: { id: secondTeamId, score: secondTeam.score },
        date: dateOfMatch,
      };

      const createdMatch = await Match.create([matchObj], { session });
      leagueMatches.push(createdMatch[0]._id);
    }

    const createdLeague = await League.create(
      [{ name: leagueName, matches: leagueMatches }],
      { session }
    );

    await session.commitTransaction();
    return createdLeague;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
