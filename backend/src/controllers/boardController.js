"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.createBoard = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, category, owner } = req.body;
    try {
        const board = yield prisma.board.create({
            data: {
                title,
                category,
                owner,
            },
        });
        res.status(201).json(board);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createBoard = createBoard;
const deleteBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    try {
        yield prisma.board.delete({
            where: {
                board_id: parseInt(boardId),
            },
        });
        res.status(204).end();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteBoard = deleteBoard;
