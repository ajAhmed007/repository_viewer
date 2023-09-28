import React, { useState } from "react";

import axios from "axios";

function App() {
  //state to store GitHub usernames
  const [username, setUsername] = useState("");
  //state to store list of repositories
  const [repos, setRepos] = useState([]);

  //function to fetch repositories for a given username from the backend
  const fetchRepos = async () => {
    try {
      //making a GET request to the backend giving the username
      const response = await axios.get(`/repos/${username}`);
      //updating the repositotry state with the fetched repos
      setRepos(response.data);
    } catch (error) {
      //could not fetch repos
      console.error("Error fetching repos:", error);
    }
  };



  return (
    <div className="App">
      {/*input field for user to enter GitHub username*/}
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      {/*button to trigger fetching the repos*/}
      <button onClick={fetchRepos}>Fetch Repos</button>

      <ul>
        {/*for each repo in the state, display its name in a list*/}
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
