const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Article search, proxied so the NYT API key never reaches the browser.
// Set NYT_API_KEY in the environment (https://developer.nytimes.com).
app.get("/api/search", async function(req, res) {
  const apiKey = process.env.NYT_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "NYT_API_KEY is not set on the server" });
  }
  const query = typeof req.query.q === "string" ? req.query.q : "";
  const url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" +
    new URLSearchParams({ q: query, "api-key": apiKey });
  try {
    const response = await fetch(url);
    res.status(response.status).json(await response.json());
  } catch (err) {
    res.status(502).json({ error: "Could not reach the NYT API" });
  }
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("/{*path}", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
