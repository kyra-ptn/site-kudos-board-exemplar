import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all boards
const getBoards = async (req: Request, res: Response) => {

  try {
    const boards = await prisma.board.findMany();

    res.status(200).json({ boards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET a single board by ID
const getBoardById = async (req: Request, res: Response) => {

  const { boardId } = req.params;

  try {
    const board = await prisma.board.findUnique({
      where: { board_id: parseInt(boardId) },
      include: {cards: true}
    });

    if (!board) {
      console.log('Board not found');
      res.status(404).json({ error: 'Board not found' });
      return;
    }

    res.status(200).json({ board });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST create a new board
const createBoard = async (req: Request, res: Response) => {
  const { title, category, owner } = req.body;

  try {
    const board = await prisma.board.create({
      data: {
        title,
        category,
        owner,
      },
    });

    res.status(201).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE a board
const deleteBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;

  try {
    await prisma.board.delete({
      where: {
        board_id: parseInt(boardId),
      },
    });

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getBoards, createBoard, deleteBoard, getBoardById };
