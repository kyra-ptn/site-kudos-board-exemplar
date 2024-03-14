import React, { useState } from "react";
import axios from "axios";

const CardForm = ({ boardId, onSuccess, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gif, setGif] = useState("");
  const [owner, setOwner] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [gifOptions, setGifOptions] = useState([]);
  const [selectedGifUrl, setSelectedGifUrl] = useState("");

  const apiKey = "SVjCXhQIJfOWRk1Y31nD9qoguHb4w2tV";

  const searchGifs = async () => {
    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: apiKey,
          q: searchTerm,
        },
      });

      const gifData = response.data.data;
      const gifUrls = gifData.map((gif) => gif.images.original.url);
      setGifOptions(gifUrls);
    } catch (error) {
      console.error("Error searching for GIFs:", error);
    }
  };

  const handleSelectGif = (gifUrl) => {
    setSelectedGifUrl(gifUrl);
    setGif(gifUrl);
    setGifOptions([]);
  };

  const handleCopyGifUrl = () => {
    setGif(selectedGifUrl);
  };

  const createNewCard = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/boards/${boardId}/cards`,
        {
          title,
          description,
          gif,
          owner,
        }
      );
      console.log("Response data:", response.data); // Log entire response data

      const newCard = response.data;
      console.log("its me", newCard);
      // Pass the new card to the onSuccess function
      onSuccess(newCard);

      // Reset form fields after successful card creation
      setTitle("");
      setDescription("");
      setGif("");
      setOwner("");

      onClose();
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  return (
    <div className="overlay">
      <div className="new-card-form">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Create a New Card</h2>
        <input
          type="text"
          placeholder="Enter card title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter card description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search GIFs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={searchGifs}>
          Search
        </button>
        {gifOptions.length > 0 && (
          <div className="gif-options">
            {gifOptions.map((gifUrl) => (
              <img
                key={gifUrl}
                src={gifUrl}
                alt="GIF"
                onClick={() => handleSelectGif(gifUrl)}
              />
            ))}
          </div>
        )}
        <input
          type="text"
          placeholder="Enter GIF URL"
          value={gif}
          onChange={(e) => setGif(e.target.value)}
        />
        <button type="button" onClick={handleCopyGifUrl}>
          Copy GIF URL
        </button>
        <input
          type="text"
          placeholder="Enter owner (optional)"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <button onClick={createNewCard}>Create Card</button>
      </div>
    </div>
  );
};

export default CardForm;
