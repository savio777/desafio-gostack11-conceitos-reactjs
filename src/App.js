import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get("/repositories");

      setRepositories(response.data);
    }

    getRepositories();
  }, []);

  async function handleAddRepository() {
    const body = {
      title: "Desafio ReactJS",
      url: "http://teste",
      techs: "iae, sim, iae",
    };

    const response = await api.post("/repositories", body);

    if (response.status === 200) {
      setRepositories([...repositories, body]);
    }
  }

  async function handleRemoveRepository(id, index) {
    const response = await api.delete("/repositories/" + id);

    if (response.status === 204) {
      const repos = repositories;

      repos.splice(index, 1);
      setRepositories([...repos]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 &&
          repositories.map((value, index) => (
            <li key={`${value.id}-${index}`}>
              {value.title}
              <button onClick={() => handleRemoveRepository(value.id, index)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
