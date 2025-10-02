import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedAdmin = async () => {
  try {
    const credEmail = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!credEmail || !password) {
      console.error(" Admin credentials are missing in .env file");
      process.exit(1);
    }

    const hashedPassword = await hash(password, 10);

    // check if admin exists
    const existingUser = await prisma.user.findFirst({
      where: { email: credEmail },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: credEmail,
          password: hashedPassword,
          userName: "Admin",
        },
      });
      console.log("Admin seeded successfully!");
    } else {
      await prisma.user.updateMany({
        where: { email: credEmail },
        data: {
          password: hashedPassword, // update if password changed
          userName: "Admin",
        },
      });
      console.log(" Admin updated successfully!");
    }
  } catch (error) {
    console.error(" Error seeding admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};

