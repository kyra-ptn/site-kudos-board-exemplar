import express from 'express';
import { getCardsForBoard, createCardForBoard, getVotesForCard, updateVotesForCard , deleteCard } from '../controllers/cardController';

const cardRouter = express.Router();

// GET all cards for a board
cardRouter.get('/:boardId/cards', getCardsForBoard);

// POST create a new card for a board
cardRouter.post('/:boardId/cards', createCardForBoard);

// GET votes for a card
cardRouter.get('/:boardId/cards/:cardId/votes', getVotesForCard )

// PATCH votes for a card 
cardRouter.patch('/:boardId/cards/:cardId/votes', updateVotesForCard )

// DELETE a card
cardRouter.delete('/:boardId/cards/:cardId', deleteCard);

export default cardRouter;
