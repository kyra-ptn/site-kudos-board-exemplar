import React, { useState, useEffect } from 'react';
import './HomePage.css'; 
const HomePage = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // Fetch boards from the API
    fetch('http://localhost:3001/boards/')
      .then((response) => response.json())
      .then((data) => setBoards(data.boards))
      .catch((error) => console.error('Error fetching boards:', error));
  }, []);
console.log(boards)
  const renderBoards = () => {
  
    return boards.map((board) => (
      <div key={board.board_id} className="board-preview">
        <img src={"https://picsum.photos/200/300?random=1"} alt={board.title} />
        <h3>{board.title}</h3>
        <p>{board.category}</p>
        <button className='board-preview' onClick={() => viewBoard(board.board_id)}>View Board</button>
        <button className='delete-board' onClick={() => deleteBoard(board.board_id)}>Delete Board</button>
      </div>
    ));
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

      <section className="board-grid">{renderBoards()}</section>
    </div>
  );
};

export default HomePage;
