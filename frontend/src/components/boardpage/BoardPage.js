// BoardPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../card/Card';
import CardForm from '../cardform/CardForm';

const BoardPage = () => {
  const { boardId } = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch cards for the board using the board ID from the URL params
      fetchCards(boardId);
  
  }, [boardId]);

  const fetchCards = async (boardId) => {
    try {
      const response = await axios.get(`http://localhost:3001/boards/${boardId}/cards`);
      setCards(response.data.cards);
      console.log(response)
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleCreateCard = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`http://localhost:3001/boards/${boardId}/cards/${cardId}`);

      fetchCards(boardId);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };
  
  return (
    <div>
      <h2>Board Page</h2>
      <CardForm boardId={boardId} onCreate={handleCreateCard} />
      <div className="card-list">
        {cards.map((card) => (
          <Card key={card.id} card={card} onDelete={() => handleDelete(card.card_id)}/>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
