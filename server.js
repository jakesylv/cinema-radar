const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.use(express.static("public"));

// Helper
function createEvent(title, date, location) {
  return { title, date, location };
}

// --- New Beverly ---
async function getNewBeverly() {
  try {
    const { data } = await axios.get("https://thenewbev.com/schedule/");
    const $ = cheerio.load(data);

    let events = [];

    $(".schedule-item").each((i, el) => {
      const title = $(el).find(".title").text().trim();
      const date = $(el).find(".date").text().trim();

      if (title && date) {
        events.push(createEvent(title, date, "New Beverly"));
      }
    });

    return events;
  } catch (err) {
    console.log("New Bev failed");
    return [];
  }
}

// --- Vidiots ---
async function getVidiots() {
  try {
    const { data } = await axios.get("https://vidiotsfoundation.org/events/");
    const $ = cheerio.load(data);

    let events = [];

    $(".event-item").each((i, el) => {
      const title = $(el).find("h2").text().trim();
      const date = $(el).find(".event-date").text().trim();

      if (title && date) {
        events.push(createEvent(title, date, "Vidiots"));
      }
    });

    return events;
  } catch (err) {
    console.log("Vidiots failed");
    return [];
  }
}

// --- Endpoint ---
app.get("/events", async (req, res) => {
  const bev = await getNewBeverly();
  const vid = await getVidiots();

  res.json([...bev, ...vid]);
});

app.listen(3000, () => console.log("Running"));
