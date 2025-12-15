"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const serverConfig_1 = require("./serverConfig");
async function connectDB() {
    try {
        const connect = await mongoose_1.default.connect(serverConfig_1.DB_URL);
        console.log(`Connected to MongoDB: ${connect.connection.host} `);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error connecting to MongoDB: ', error.message);
        }
        else {
            console.error("Unknown error:", error);
        }
        throw error;
    }
}
//# sourceMappingURL=dbConfig.js.map