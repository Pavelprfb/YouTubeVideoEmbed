const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { videos: [] });
});

app.post("/show", (req, res) => {
  const { link, count } = req.body;
  let videoId = "";

  // YouTube লিঙ্ক থেকে ভিডিও আইডি বের করা
  const match = link.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
  if (match) {
    videoId = match[1];
  }

  const videos = [];
  for (let i = 0; i < Number(count); i++) {
    videos.push(videoId);
  }

  res.render("index", { videos });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));