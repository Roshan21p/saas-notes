"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const serverConfig_1 = require("./config/serverConfig");
app_1.default.listen(serverConfig_1.PORT, async () => {
    try {
        await (0, dbConfig_1.default)();
        console.log(`Server is running at http://localhost:${serverConfig_1.PORT}`);
    }
    catch (error) {
        console.error("Failed to start server due to DB error: ", error.message); // Type assertion
        process.exit(1);
    }
});
app_1.default.get("/connect-db", async (req, res) => {
    try {
        await (0, dbConfig_1.default)();
        return res
            .status(200)
            .json({ message: "Connected to MongoDB successfully" });
    }
    catch (error) {
        return res
            .status(500)
            .json({
            message: "Failed to connect to MongDB",
            error: error.message,
        });
    }
});
//# sourceMappingURL=server.js.map