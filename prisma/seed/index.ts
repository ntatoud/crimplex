import createUsers from './models/user';
import { prisma } from './utils';

const main = async () => {
  await createUsers();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
