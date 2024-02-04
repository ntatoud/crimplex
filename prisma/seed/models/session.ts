import { currentDate } from "@/lib/dayjs/utils";
import { faker } from "@faker-js/faker";
import { emphasis, prisma } from "../utils";

const createSessions = async () => {
	console.log("⏳ Seeding climbing sessions");

	let createdCounter = 0;
	const existingCount = await prisma.climbingSession.count();

	const admin = await prisma.user.findFirst({
		where: {
			email: "admin@admin.com",
		},
	});
	if (!admin) {
		throw new Error("Admin does not exist");
	}

	await Promise.all(
		Array.from({ length: Math.max(0, 500 - existingCount) }, async () => {
			const spot = await prisma.marker.findFirst();

			if (!spot) {
				throw new Error("Spot not found");
			}

			await prisma.climbingSession.create({
				data: {
					userId: admin.id,
					name: faker.music.songName(),
					duration: faker.number.int(10),
					date: faker.date.between({
						from: "2022-01-01T00:00:00.000Z",
						to: new Date(currentDate()),
					}),
					numClimbs: faker.number.int(50),
					spotId: spot.id,
				},
			});

			createdCounter += 1;
		}),
	);

	console.log(
		`✅ ${existingCount} existing climbing sessions 👉 ${createdCounter} climbing sessions created`,
	);
	console.log(`👉 Sessions on account: ${emphasis("admin@admin.com")}`);
};

export default createSessions;
