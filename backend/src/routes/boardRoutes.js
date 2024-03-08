"use strict";
// backend/src/routes/boardRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const boardController_1 = require("../controllers/boardController");
const router = express_1.default.Router();
router.post('/boards', boardController_1.createBoard);
router.delete('/boards/:boardId', boardController_1.deleteBoard);
exports.default = router;
