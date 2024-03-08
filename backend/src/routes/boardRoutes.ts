import express from 'express';
import { getBoards, createBoard, deleteBoard } from '../controllers/boardController';

const router = express.Router();

// GET all boards
router.get('/boards', getBoards);

// POST create a new board
router.post('/boards', createBoard);

// DELETE a board
router.delete('/boards/:boardId', deleteBoard);

export default router;
