const express = require("express");

const axios = require("axios");

const cors = require("cors");

const app = express();

const PORT = 5000;

app.use(cors()); // Middleware to handle CORS


//home route
app.get("/", (req, res) => {
  res.send("Server is running");
});

//route to fetch th repos
app.get("/repos/:username", async (req, res) => {
  try {
    //extracting username from the URL parameter
    const { username } = req.params;
    //making a GET request to the GitHub API with username specified
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    //sending the fetched repos to json reponse.
    res.json(response.data);

  } catch (error) {
    //checking for errors, if there's network issue, invalid username, API limit...
    console.error(
      "Error fetching repos:",
      error.response.status,
      error.response.data
    );
    //sending error reponse to the frontend  
    res
      .status(error.response?.status || 500)
      .json({ message: "Error fetching repos" });
  }
});

//starting the express server at the specified PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
