import React, { useState, useEffect } from "react";
import axios from "axios";
import GameCard from "./GameCard";
import "./PageList.css";

const API_KEY = process.env.REACT_APP_RAWG_API_KEY;

function PageList() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  useEffect(() => {
    fetchGames();
  }, [page]);

  useEffect(() => {
    const results = games.filter((game) => {
      const matchesSearchTerm = game.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPlatform = selectedPlatform
        ? game.platforms &&
          game.platforms.some(
            (platform) => platform.platform.name === selectedPlatform
          )
        : true;
      return matchesSearchTerm && matchesPlatform;
    });
    setFilteredGames(results);

    if (page * 9 < results.length && page * 9 < 27) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  }, [searchTerm, games, selectedPlatform, page]);

  const fetchGames = async () => {
    try {
      const startDate = searchTerm ? "1999-01-01" : "2024-01-01";
      const endDate = searchTerm ? "2023-12-31" : "2026-01-01"; 
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&dates=${startDate},${endDate}&page=${page}`
      );
      setGames((prevGames) => [...prevGames, ...response.data.results]);
      if (page === 1) {
        setGames(response.data.results);
      } else {
        setGames((prevGames) => [...prevGames, ...response.data.results]);
      }
      if (response.data.results.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des jeux :", error);
    }
  };


  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const uniqueGames = Array.from(
    new Set(filteredGames.map((game) => game.id))
  ).map((id) => filteredGames.find((game) => game.id === id));

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.length === 0) {
      return;
    }
    fetchGames();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="page-list">
      <h1>Upcoming Games</h1>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
        >
          <option value="">All Platforms</option>
          <option value="PC">PC</option>
          <option value="PlayStation 5">PS5</option>
          <option value="Xbox Series S/X">Xbox Series S/X</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
        </select>
      </div>
      <div className="game-list">
        {uniqueGames.slice(0, page * 9).map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      {showMore && (
        <button className="show-more" onClick={handleShowMore}>
          Show More
        </button>
      )}
    </div>
  );
}

export default PageList;
