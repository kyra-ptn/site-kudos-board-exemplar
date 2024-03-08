-- CreateTable
CREATE TABLE "board" (
    "board_id" SERIAL NOT NULL,
    "title" TEXT,
    "category" TEXT,
    "owner" TEXT,

    CONSTRAINT "board_pkey" PRIMARY KEY ("board_id")
);

-- CreateTable
CREATE TABLE "card" (
    "card_id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "gif" TEXT,
    "owner" TEXT,

    CONSTRAINT "card_pkey" PRIMARY KEY ("card_id")
);
