const express = require("express");
const Vote = require("../models/Votes");
const router = express.Router();

const candidates = ["Alice", "Bob", "Charlie"];

router.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("dashboard", { candidates });
});

router.post("/vote", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const { candidate } = req.body;
  const existingVote = await Vote.findOne({
    username: req.session.user.username,
  });

  if (existingVote) {
    return res
      .status(400)
      .send("You have already voted! You cannot change your vote.");
  }

  await Vote.create({ username: req.session.user.username, candidate });
  res.redirect("/results");
});

router.get("/results", async (req, res) => {
  const votes = await Vote.aggregate([
    { $group: { _id: "$candidate", count: { $sum: 1 } } },
  ]);
  res.render("results", { votes });
});

module.exports = router;
