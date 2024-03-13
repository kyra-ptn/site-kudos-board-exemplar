// Card.js
import React from 'react';

const Card = ({ card, onDelete }) => {
    const { title, description, gif, owner} = card;
  
    return (
      <div className="card">
        <h3>{title}</h3>
        <p>{description}</p>
        <img src={gif} alt="GIF" />
        <p>{owner}</p>
        <button onClick={onDelete}>Delete</button>
      </div>
    );
  };
  
  export default Card;
  
