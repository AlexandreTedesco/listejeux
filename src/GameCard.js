import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="game-card" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/game/${game.slug}`}> {/* Lien vers la page de détails du jeu */}
        {isHovered ? (
          <div className="game-details">
            <h2 className="game-title">{game.name}</h2>
            <p>Release Date: {game.released || 'N/A'}</p>
            <p>Publisher: {game.stores && game.stores.length > 0 ? game.stores.map(store => store.store.name).join(', ') : 'N/A'}</p>
            <p>Genres: {game.genres && game.genres.length > 0 ? game.genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
            <p>Rating: {game.rating || 'N/A'} ({game.ratings_count || 0} votes)</p>
          </div>
        ) : (
          <img className="game-image" src={game.background_image} alt={game.name} />
        )}
        <div className="platforms">
          {game.platforms && game.platforms.length > 0 ? game.platforms.map(platform => (
            <Link key={platform.platform.id} to={`/platform/${platform.platform.slug}`}>
              {platform.platform.name}
            </Link>
          )) : 'N/A'}
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
