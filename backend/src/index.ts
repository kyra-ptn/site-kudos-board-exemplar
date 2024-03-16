import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import cors from "cors";
import boardRoutes from "./routes/boardRoutes";
import cardRouter from "./routes/cardRoutes";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'path_to_your_react_build_folder')));

// Use card routes under /boards/:boardId
app.use("/:boardId", cardRouter);

// Use board routes for other routes
app.use("/", boardRoutes);

// Error handling middleware
app.use((err: any, req:any, res:any, next:any) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
