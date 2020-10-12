import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepos(response.data);
    })
  }, []);

  async function handleAddRepository() {
    await api.post('/repositories', {
      title: "repo",
      url: "someurl",
      techs: [],
    }).then( response => setRepos([...repos, response.data]));
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then(response => {
      let currentRepos = repos.map(repo => repo);
      const repoIndex = repos.findIndex(repo => repo.id === id);

      currentRepos.splice(repoIndex, 1);

      return setRepos(currentRepos);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
          )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
