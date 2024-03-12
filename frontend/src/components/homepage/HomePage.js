import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import NewBoardForm from "../newboardform/NewBoardForm";
import img from "../../assets/kudoboard_logo.png";

const HomePage = () => {
  const [boards, setBoards] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch the list of boards on initial load
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await axios.get("http://localhost:3001/boards");
      setBoards(response.data.boards);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  const renderBoards = () => {
    return boards.map((board) => (
      <div key={board.board_id} className="board-preview">
        <img
          src={`https://picsum.photos/200/300?random=${board.board_id}`}
          alt={board.title}
        />
        <h3>{board.title}</h3>
        <p>{board.category}</p>
        <button
          className="button-common view-board"
          onClick={() => viewBoard(board.board_id)}
        >
          View Board
        </button>
        <button
          className="button-common delete-board"
          onClick={() => deleteBoard(board.board_id)}
        >
          Delete Board
        </button>
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

  const deleteBoard = async (boardId) => {
    try {
      const response = await fetch(`http://localhost:3001/boards/${boardId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`Board ${boardId} deleted successfully.`);
        // Update state locally to remove the deleted board
        setBoards((prevBoards) =>
          prevBoards.filter((board) => board.board_id !== boardId)
        );
      } else {
        // Handle non-JSON response
        const text = await response.text();
        console.error(`Failed to delete Board ${boardId}.`, text);
      }
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  return (
    <div className="home-page">
      <header className="banner">
        <img src={img} alt="Kudoboard Logo" />
      </header>

      <main className="search">
        <input type="text" placeholder="Search boards..." />
        <button className="search-button button-common">Search</button>
      </main>
      
      <div className="center-button-container">
        <button className="button-common create-brd-btn" onClick={toggleForm}>
          Create a New Board
        </button>
        {showForm && <NewBoardForm onSuccess={handleCreateSuccess} />}
      </div>

      <section className="board-grid">{renderBoards()}</section>
    </div>
  );
};

export default HomePage;
