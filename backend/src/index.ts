import boardRoutes from "./routes/boardRoutes";
import cardRouter from "./routes/cardRoutes";

const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");

const app = express();

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use(express.json());
app.use(cors());


// Use card routes under /boards/:boardId
app.use("/:boardId", cardRouter);

app.use("/", boardRoutes);

// Serve React index.html for all other routes
app.get('*', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
