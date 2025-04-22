// Card.js
import React, { useState } from "react";
import "./Card.css";
import axios from "axios";

const Card = ({ card, onDelete }) => {
  const { title, description, gif, owner } = card;
  const [votes, setVotes] = useState(card.votes || 0);

  const handleUpvote = async () => {
    try {
      await axios.patch(
        `https://site-kudos-board-exemplar-backend.onrender.com/boards/${card.board_id}/cards/${card.card_id}/votes`,
        {
          // Send the updated votes count to the backend
          votes: votes + 1,
        }
      );
    
      setVotes(votes + 1); // Update the local state with the new vote count
    } catch (error) {
      console.error("Error upvoting card:", error);
    }
  };

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <img src={gif} alt="GIF" />
      <p>{owner}</p>
      <button className='upvote-button' onClick={handleUpvote}>Upvote: {votes}</button>
      <button className="delete-button" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default Card;
