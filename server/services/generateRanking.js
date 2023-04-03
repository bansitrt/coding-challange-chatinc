const { League, Match } = require("../models/model");
const { ObjectId } = require("bson");

module.exports = async function createLeagueWithMatches(leagueId) {
  try {
    const scores = {};
    const matches = await League.aggregate([
      {
        $match: {
          _id: new ObjectId(leagueId),
        },
      },
      {
        $lookup: {
          from: "matches",
          localField: "matches",
          foreignField: "_id",
          as: "matches",
        },
      },
      {
        $unwind: "$matches",
      },
      {
        $lookup: {
          from: "teams",
          localField: "matches.firstTeam.id",
          foreignField: "_id",
          as: "matches.firstTeam.team",
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "matches.secondTeam.id",
          foreignField: "_id",
          as: "matches.secondTeam.team",
        },
      },
      {
        $lookup: {
          from: "leagues",
          localField: "_id",
          foreignField: "_id",
          as: "league",
        },
      },
      {
        $project: {
          _id: "$matches._id",
          date: "$matches.date",
          firstTeam: {
            $mergeObjects: [
              "$matches.firstTeam",
              {
                team: { $arrayElemAt: ["$matches.firstTeam.team.name", 0] },
              },
            ],
          },
          secondTeam: {
            $mergeObjects: [
              "$matches.secondTeam",
              {
                team: { $arrayElemAt: ["$matches.secondTeam.team.name", 0] },
              },
            ],
          },
          leagueName: { $arrayElemAt: ["$league.name", 0] },
        },
      },
      {
        $group: {
          _id: "$_id",
          matches: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 1,
          name: "$leagueName",
          teams: "$matches",
        },
      },
    ]);

    for (const match of matches) {
      const { firstTeam, secondTeam } = match.teams[0];

      if (firstTeam.score > secondTeam.score) {
        scores[firstTeam.team] = (scores[firstTeam.team] || 0) + 3;
        scores[secondTeam.team] = scores[secondTeam.team] || 0;
      } else if (secondTeam.score > firstTeam.score) {
        scores[secondTeam.team] = (scores[secondTeam.team] || 0) + 3;
        scores[firstTeam.team] = scores[firstTeam.team] || 0;
      } else {
        scores[firstTeam.team] = (scores[firstTeam.team] || 0) + 1;
        scores[secondTeam.team] = (scores[secondTeam.team] || 0) + 1;
      }
    }

    const sortedScores = Object.entries(scores)
      .map(([team, score]) => ({ team, score }))
      .sort((a, b) => b.score - a.score);

    const league = await League.find();

    return { ranking: sortedScores, league: matches[0].teams[0].leagueName };
  } catch (error) {
    throw error;
  }
};
