import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PageDetail.css'; // Assurez-vous d'importer votre fichier CSS

const API_KEY = process.env.REACT_APP_RAWG_API_KEY;

function PageDetail() {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGameDetails();
  }, [slug]);

  const fetchGameDetails = async () => {
    try {
      const response = await axios.get(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`);
      setGame(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du jeu :", error);
      setError("Erreur lors de la récupération des détails du jeu.");
    }
  };

  if (error) return <p>{error}</p>;
  if (!game) return <p>Loading...</p>;

  return (
    <div className="page-detail">
      <h1>{game.name}</h1>
      <img className="game-image" src={game.background_image} alt={game.name} />
      <p dangerouslySetInnerHTML={{ __html: game.description }}></p>
      <p>Release Date: {game.released}</p>

      <div className="info-section">
        <h2>Game Information</h2>
        <table>
          <tbody>
            <tr>
              <th>Developers</th>
              <td>{game.developers && game.developers.length > 0 ? game.developers.map(dev => dev.name).join(', ') : 'N/A'}</td>
            </tr>
            <tr>
              <th>Genres</th>
              <td>{game.genres && game.genres.length > 0 ? game.genres.map(genre => genre.name).join(', ') : 'N/A'}</td>
            </tr>
            <tr>
              <th>Publisher</th>
              <td>{game.publishers && game.publishers.length > 0 ? game.publishers.map(pub => pub.name).join(', ') : 'N/A'}</td>
            </tr>
            <tr>
              <th>Platforms</th>
              <td>{game.platforms && game.platforms.length > 0 ? game.platforms.map(platform => platform.platform.name).join(', ') : 'N/A'}</td>
            </tr>
            <tr>
              <th>Website</th>
              <td><a href={game.website} target="_blank" rel="noopener noreferrer">{game.website}</a></td>
            </tr>
            <tr>
              <th>Rating</th>
              <td>{game.rating}</td>
            </tr>
            <tr>
              <th>Ratings Count</th>
              <td>{game.ratings_count}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3>Screenshots</h3>
        {game.screenshots && game.screenshots.length > 0 ? (
          game.screenshots.map(screenshot => (
            <img key={screenshot.id} src={screenshot.image} alt="Screenshot" />
          ))
        ) : (
          <p>No screenshots available.</p>
        )}
      </div>

      <div>
        <h3>Buy Links</h3>
        {game.stores && game.stores.length > 0 ? game.stores.map(store => (
          <span key={store.id}>
            <a href={store.store.url} target="_blank" rel="noopener noreferrer">{store.store.name}</a>
          </span>
        )).join(', ') : 'N/A'}
      </div>
    </div>
  );
}

export default PageDetail;
