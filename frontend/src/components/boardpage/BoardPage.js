import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../card/Card";
import CardForm from "../cardform/CardForm";

const BoardPage = () => {
  const { boardId } = useParams();
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCards();
  }, [boardId]);

  const fetchCards = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/boards/${boardId}/cards`
      );
      setCards(response.data.cards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(
        `http://localhost:3001/boards/${boardId}/cards/${cardId}`
      );
      fetchCards();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCreateSuccess = (newCard) => {
    console.log(newCard)
    // Ensure the new card data is valid
    if (newCard && newCard.card_id) {
      // Add the newly created card to the existing cards state
      setCards([...cards, newCard]);
      // Hide the form
      setShowForm(false);
    } else {
      console.error("Invalid card data received:", newCard);
    }
  };

  return (
    <div>
      <h2>Board {boardId}'s Page</h2>
      <div>
        <button onClick={toggleForm}>Create a Card</button>
        {showForm && (
          <CardForm boardId={boardId} onSuccess={handleCreateSuccess} onClose={toggleForm} />
        )}
      </div>

      <div className="card-list">
        {cards.map((card) => (
          <Card
            key={card.card_id}
            card={card}
            onDelete={() => handleDelete(card.card_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
