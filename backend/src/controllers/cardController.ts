// cardController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all cards for a board
const getCardsForBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;

  try {
    const cards = await prisma.card.findMany({
      where: { board_id: parseInt(boardId) } as any,
    });
 

    res.status(200).json({ cards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST create a new card for a board
const createCardForBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const { title, description, gif, owner } = req.body;

  try {
    const card = await prisma.card.create({
      data: {
        title,
        description,
        gif,
        owner,
        board_id: parseInt(boardId),
      } as any,
    });

    res.status(201).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//PATCH upvotes for a card
const updateVotesForCard = async (req: Request, res: Response) => {
  const { boardId, cardId } = req.params;
  const { votes } = req.body;

  try {
    if (isNaN(votes)) {
      return res.status(400).json({ message: 'Votes must be a number' });
    }

    const updatedCard = await prisma.card.update({
      where: { card_id: parseInt(cardId), board_id: parseInt(boardId) },
      data: { votes: parseInt(votes) },
    });

    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json({ votes: updatedCard.votes });
  } catch (error) {
    console.error('Error updating votes for card:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET votes for a card 
const getVotesForCard = async (req: Request, res: Response) => {
  const { boardId, cardId } = req.params;

  try {
    const card = await prisma.card.findUnique({
      where: { card_id: parseInt(cardId), board_id: parseInt(boardId) },
      select: { votes: true },
    });

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json({ votes: card.votes });
  } catch (error) {
    console.error('Error retrieving votes for card:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// DELETE a card
const deleteCard = async (req: Request, res: Response) => {
  const { boardId, cardId } = req.params;

  try {
    await prisma.card.delete({
      where: { card_id: parseInt(cardId), board_id: parseInt(boardId) },
    });

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getCardsForBoard, createCardForBoard, getVotesForCard, updateVotesForCard, deleteCard };
