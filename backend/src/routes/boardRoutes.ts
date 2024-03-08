import express from 'express';
import { getBoards, getBoardById, createBoard, deleteBoard } from '../controllers/boardController';
import cardRouter from './cardRoutes';

const router = express.Router();

// GET a single board by ID
router.get('/boards/:boardId', getBoardById);
// GET all boards
router.get('/boards', getBoards);

// POST create a new board
router.post('/boards', createBoard);

// DELETE a board
router.delete('/boards/:boardId', deleteBoard);

// Use card routes
router.use('/boards/:boardId', cardRouter);

export default router;
