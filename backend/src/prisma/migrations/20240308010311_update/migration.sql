-- AlterTable
ALTER TABLE "card" ADD COLUMN     "board_id" INTEGER;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "board"("board_id") ON DELETE SET NULL ON UPDATE CASCADE;
