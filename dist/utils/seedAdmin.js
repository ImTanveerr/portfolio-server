"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const bcrypt_1 = require("bcrypt");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credEmail = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        if (!credEmail || !password) {
            console.error(" Admin credentials are missing in .env file");
            process.exit(1);
        }
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        // check if admin exists
        const existingUser = yield prisma.user.findFirst({
            where: { email: credEmail },
        });
        if (!existingUser) {
            yield prisma.user.create({
                data: {
                    email: credEmail,
                    password: hashedPassword,
                    userName: "Admin",
                },
            });
            console.log("Admin seeded successfully!");
        }
        else {
            yield prisma.user.updateMany({
                where: { email: credEmail },
                data: {
                    password: hashedPassword, // update if password changed
                    userName: "Admin",
                },
            });
            console.log(" Admin updated successfully!");
        }
    }
    catch (error) {
        console.error(" Error seeding admin:", error);
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.seedAdmin = seedAdmin;
