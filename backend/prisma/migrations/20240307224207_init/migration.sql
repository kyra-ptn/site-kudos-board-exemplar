-- CreateTable
CREATE TABLE "board" (
    "board_id" SERIAL NOT NULL,
    "title" TEXT,
    "owner" TEXT,

    CONSTRAINT "board_pkey" PRIMARY KEY ("board_id")
);
