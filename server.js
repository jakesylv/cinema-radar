const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/events", (req, res) => {
  res.json([
    { title: "Heat", date: "2026-03-25", location: "New Beverly" },
    { title: "The Thing", date: "2026-03-26", location: "New Beverly" },
    { title: "Mulholland Drive", date: "2026-03-25", location: "Vidiots" }
  ]);
});

app.listen(3000, () => console.log("Running"));
