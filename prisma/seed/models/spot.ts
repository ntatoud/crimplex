import { faker } from "@faker-js/faker";
import { prisma } from "../utils";

const createSpots = async () => {
	console.log("⏳ Seeding climbing spots");

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
		Array.from({ length: Math.max(0, 5 - existingCount) }, async () => {
			await prisma.marker.create({
				data: {
					createdById: admin.id,
					name: faker.music.songName(),
					position: {
						latitude: faker.location.latitude(),
						longitude: faker.location.longitude(),
					},
				},
			});

			createdCounter += 1;
		}),
	);
};

export default createSpots;
