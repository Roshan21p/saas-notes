"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const note_1 = require("../models/note");
const tenant_1 = require("../models/tenant");
const user_1 = require("../models/user");
async function seed() {
    try {
        // connect to MongoDB
        await (0, dbConfig_1.default)();
        // Clear existing data to avoid duplicates on re-run
        console.log("Seeding: clearing existing data...");
        await Promise.all([
            note_1.Note.deleteMany({}),
            user_1.User.deleteMany({}),
            tenant_1.Tenant.deleteMany({}),
        ]);
        // Create tenants
        console.log("Creating tenants...");
        const acme = await tenant_1.Tenant.create({
            name: "Acme Corporation",
            slug: "acme",
            plan: "free",
            noteLimit: 3,
        });
        const globex = await tenant_1.Tenant.create({
            name: "Globex Corporation",
            slug: "globex",
            plan: "free",
            noteLimit: 3,
        });
        const plainPassword = "password";
        // Create users for both tenants with roles
        console.log("Creating users...");
        const users = await user_1.User.create([
            {
                name: "Roshan",
                email: "admin@acme.test",
                password: plainPassword,
                role: "Admin",
                tenantId: acme._id,
            },
            {
                name: "Anand",
                email: "user@acme.test",
                password: plainPassword,
                role: "Member",
                tenantId: acme._id,
            },
            {
                name: "Akash",
                email: "admin@globex.test",
                password: plainPassword,
                role: "Admin",
                tenantId: globex._id,
            },
            {
                name: "Suraj",
                email: "user@globex.test",
                password: plainPassword,
                role: "Member",
                tenantId: globex._id,
            },
        ]);
        // Create sample notes for users, maintaining tenant isolation
        console.log("Creating some sample notes...");
        await note_1.Note.create([
            {
                title: "Acme Note 1",
                content: "This is acme note one.",
                tenantId: acme._id,
                userId: users[0]._id,
            },
            {
                title: "Acme Note 2",
                content: "This is acme note two.",
                tenantId: acme._id,
                userId: users[1]._id,
            },
            {
                title: "Globex Note 1",
                content: "This is globex note one.",
                tenantId: globex._id,
                userId: users[2]._id,
            },
        ]);
        process.exit(0); // means successful data filled
    }
    catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}
seed();
//# sourceMappingURL=seed.js.map