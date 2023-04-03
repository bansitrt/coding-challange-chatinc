const express = require("express");
const { ObjectId } = require("bson");

const { League } = require("../models/model");
const createLeagueWithMatches = require("../services/createLeagueWithMatches");
const generateRanking = require("../services/generateRanking");
const router = express.Router();

module.exports = router;

router.post("/leagues", async (req, res) => {
  const { name: leagueName, matches } = req.body;

  try {
    const league = await createLeagueWithMatches(leagueName, matches);
    res.status(201).json(league);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/leagues", async (req, res) => {
  try {
    const leagues = await League.find({});
    res.send(leagues);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/leagues/:id", async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) {
      return res.status(404).json({ msg: "League not found" });
    }
    res.json(league);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.put("/leagues/:id", async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) {
      return res.status(404).json({ msg: "League not found" });
    }
    league.name = req.body.name || league.name;
    league.country = req.body.country || league.country;
    league.champion = req.body.champion || league.champion;
    await league.save();
    res.json(league);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/leagues/:id/ranking", async (req, res) => {
  try {
    const rankings = await generateRanking(req.params.id);
    res.json(rankings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/leagues/:id", async (req, res) => {
  try {
    const league = await League.deleteOne({ _id: new ObjectId(req.params.id) });
    if (!league) {
      return res.status(404).json({ msg: "League not found" });
    }
    res.json({ msg: "League removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

const a = {
  name: "LeagueOne",
  matches: [
    {
      firstTeam: { name: "teamOne", score: "scoreOne" },
      secondTeam: { name: "teamTwo", score: "scoreTwo" },
      date: new Date("2023-04-02"),
    },
    {
      secondTeam: { name: "teamOne", score: "scoreOne" },
      secondTeam: { name: "teamTwo", score: "scoreTwo" },
      date: new Date("2023-04-03"),
    },
  ],
};
