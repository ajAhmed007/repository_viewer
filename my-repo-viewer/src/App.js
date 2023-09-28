import React, { useState } from "react";

import axios from "axios";

function App() {
  const [username, setUsername] = useState("");

  const [repos, setRepos] = useState([]);

  const fetchRepos = async () => {
    try {
      const response = await axios.get(`/repos/${username}`);

      setRepos(response.data);
    } catch (error) {
      console.error("Error fetching repos:", error);
    }
  };

  return (
    <div className="App">
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />

      <button onClick={fetchRepos}>Fetch Repos</button>

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
