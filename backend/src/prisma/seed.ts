// filepath: /Users/kyrapatton/Developer/codepath/site-kudos-board-exemplar/site-kudos-board-exemplar/backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.board.createMany({
    data: [
      {
        title: 'Congrats Interns!',
        category: 'Celebration',
        owner: 'CodePath',
      },
      {
        title: 'All The Best!',
        category: 'Thank You',
        owner: 'Jane Smith',
      },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });