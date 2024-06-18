import express from "express";
import cors from "cors";
import boardRoutes from "./routes/boardRoutes";
import cardRouter from "./routes/cardRoutes";

const app = express();

// Serve static files from the React build directory
app.use(express.json());
app.use(cors());

// Use card routes under /boards/:boardId
app.use("/:boardId", cardRouter);
app.use("/", boardRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
