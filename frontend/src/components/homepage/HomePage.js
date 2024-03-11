import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css'; 
import NewBoardForm from '../newboardform/NewBoardForm';

const HomePage = () => {
  const [boards, setBoards] = useState([]);
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    // Fetch the list of boards on initial load
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await axios.get('http://localhost:3001/boards');
      setBoards(response.data.boards);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const renderBoards = () => {
  
    return boards.map((board) => (
      <div key={board.board_id} className="board-preview">
        <img src={`https://picsum.photos/200/300?random=${board.board_id}`} alt={board.title} />
        <h3>{board.title}</h3>
        <p>{board.category}</p>
        <button className='button-common view-board' onClick={() => viewBoard(board.board_id)}>View Board</button>
        <button className='button-common delete-board' onClick={() => deleteBoard(board.board_id)}>Delete Board</button>
      </div>
    ));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCreateSuccess = () => {
    // After creating the board, fetch the updated list of boards
    fetchBoards();

    // Hide the form
    setShowForm(false);
  };

  const viewBoard = (boardId) => {
    // Logic to navigate to the detailed board view page
    console.log(`Viewing Board ${boardId}`);
  };

  const deleteBoard = (boardId) => {
    // Logic to delete the board
    console.log(`Deleting Board ${boardId}`);
  };

  return (
    <div className="home-page">
      <header className="banner">
        {/* Banner content */}
      </header>

      <main className="search">
        <input type="text" placeholder="Search boards..." />
        <button>Search</button>
      </main>

      <button onClick={toggleForm}>Create a New Board</button>
      {showForm && <NewBoardForm onSuccess={handleCreateSuccess} />}

      <section className="board-grid">{renderBoards()}</section>

    </div>
  );
};

export default HomePage;
