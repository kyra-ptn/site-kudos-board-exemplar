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

export { getCardsForBoard, createCardForBoard, deleteCard };
