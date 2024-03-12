import React, { useState } from 'react';
import axios from 'axios';
import './NewBoardForm.css';

const NewBoardForm = ({ onSuccess }) => {
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [newBoardCategory, setNewBoardCategory] = useState('');
  const [newBoardAuthor, setNewBoardAuthor] = useState('');

  const createNewBoard = async () => {
    try {
      // Perform the POST request to create a new board
      await axios.post('http://localhost:3001/boards', {
        title: newBoardTitle,
        category: newBoardCategory,
        owner: newBoardAuthor,
      });

      // If successful, trigger the onSuccess callback (passed from the parent component)
      onSuccess();

      // Clear the input fields
      setNewBoardTitle('');
      setNewBoardCategory('');
      setNewBoardAuthor('');
    } catch (error) {
      console.error('Error creating a new board:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Board</h2>
      <label>Title:</label>
      <input type="text" value={newBoardTitle} onChange={(e) => setNewBoardTitle(e.target.value)} />
      <label>Category:</label>
      <input type="text" value={newBoardCategory} onChange={(e) => setNewBoardCategory(e.target.value)} />
      <label>Author:</label>
      <input type="text" value={newBoardAuthor} onChange={(e) => setNewBoardAuthor(e.target.value)} />
      <button onClick={createNewBoard}>Create Board</button>
    </div>
  );
};

export default NewBoardForm;
