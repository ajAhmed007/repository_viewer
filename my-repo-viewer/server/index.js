const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors()); // Middleware to handle CORS

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get("/repos/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching repos:",
      error.response.status,
      error.response.data
    );

    res
      .status(error.response?.status || 500)
      .json({ message: "Error fetching repos" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
