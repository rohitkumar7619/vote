const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about"); // This renders about.ejs from the 'views' folder
});

router.get("/Contact", (req, res) => {
  res.render("contact"); // This renders about.ejs from the 'views' folder
});

module.exports = router;
