import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

import { emphasis, prisma } from "../utils";

const createUsers = async () => {
	console.log("⏳ Seeding users");

	let createdCounter = 0;
	const existingCount = await prisma.user.count();

	await Promise.all(
		Array.from({ length: Math.max(0, 10 - existingCount) }, async () => {
			await prisma.user.create({
				data: {
					name: faker.person.firstName(),
					email: faker.internet.email().toLowerCase(),
					password: await hash("random", 12),
				},
			});
			createdCounter += 1;
		}),
	);

	if (!(await prisma.user.findUnique({ where: { email: "user@user.com" } }))) {
		await prisma.user.create({
			data: {
				name: "user",
				email: "user@user.com",
				password: await hash("user", 12),
			},
		});
	}

	if (
		!(await prisma.user.findUnique({ where: { email: "admin@admin.com" } }))
	) {
		await prisma.user.create({
			data: {
				name: "admin",
				email: "admin@admin.com",
				password: await hash("admin", 12),
				authorizations: ["admin"],
				isActivated: true,
			},
		});
	}

	console.log(
		`✅ ${existingCount} existing user 👉 ${createdCounter} users created`,
	);
	console.log(`👉 Admin connect with: ${emphasis("admin@admin.com")}`);
	console.log(`👉 User connect with: ${emphasis("user@user.com")}`);
};

export default createUsers;
