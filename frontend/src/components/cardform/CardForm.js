import React, { useState } from "react";
import axios from "axios";

const CardForm = ({ boardId, onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gif, setGif] = useState("");
  const [owner, setOwner] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [gifOptions, setGifOptions] = useState([]);
  const [selectedGifUrl, setSelectedGifUrl] = useState("");

  const apiKey = "SVjCXhQIJfOWRk1Y31nD9qoguHb4w2tV"; // Replace with your Giphy API key
  

  const searchGifs = async () => {
    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: apiKey,
          q: searchTerm,
        },
      });

      // Process the response data
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      onCreate(response.data.card);
      setTitle("");
      setDescription("");
      setGif("");
      setOwner("");
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Create Card</button>
    </form>
  );
};

export default CardForm;
