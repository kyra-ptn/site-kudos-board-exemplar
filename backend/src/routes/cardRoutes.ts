import express from 'express';
import { getCardsForBoard, createCardForBoard, deleteCard } from '../controllers/cardController';

const cardRouter = express.Router();

// GET all cards for a board
cardRouter.get('/:boardId/cards', getCardsForBoard);

// POST create a new card for a board
cardRouter.post('/:boardId/cards', createCardForBoard);

// DELETE a card
cardRouter.delete('/:boardId/cards/:cardId', deleteCard);

export default cardRouter;
