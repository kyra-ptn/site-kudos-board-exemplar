import React, { useState } from "react";
import axios from "axios";
import "./NewBoardForm.css";

const NewBoardForm = ({ onSuccess, onClose }) => {
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardCategory, setNewBoardCategory] = useState("");
  const [newBoardAuthor, setNewBoardAuthor] = useState("");

  const categories = ["Celebration", "Thank You", "Inspiration"];

  const createNewBoard = async () => {
    try {
      if (!newBoardTitle || !newBoardCategory) {
        alert("Please fill out the Title and Category fields");
        return;
      }

      await axios.post("https://site-kudos-board-exemplar-backend.onrender.com/boards", {
        title: newBoardTitle,
        category: newBoardCategory,
        owner: newBoardAuthor || "Anonymous",
      });

      onSuccess();

      setNewBoardTitle("");
      setNewBoardCategory("");
      setNewBoardAuthor("");

      onClose();
    } catch (error) {
      console.error("Error creating a new board:", error);
    }
  }; // Properly close the createNewBoard function here

  return (
    <div className="overlay">
      <div className="new-board-form">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Create a New Board</h2>
        <label>Title:</label>
        <input
          type="text"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          required
        />
        <label>Category:</label>
        <select
          value={newBoardCategory}
          onChange={(e) => setNewBoardCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Author:</label>
        <input
          type="text"
          value={newBoardAuthor}
          onChange={(e) => setNewBoardAuthor(e.target.value)}
        />
        <button className="submit" onClick={createNewBoard}>
          Create Board
        </button>
      </div>
    </div>
  );
};

export default NewBoardForm;
