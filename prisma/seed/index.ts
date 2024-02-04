import createSessions from "./models/session";
import createSpots from "./models/spot";
import createUsers from "./models/user";
import { prisma } from "./utils";

const main = async () => {
	await createUsers();
	await createSpots();
	await createSessions();
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect();
	});
