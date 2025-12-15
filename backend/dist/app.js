"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const cors_1 = __importDefault(require("cors"));
const serverConfig_1 = require("./config/serverConfig");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: serverConfig_1.FRONTEND_URL,
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use("/api", apiRoutes_1.default);
app.use("/ping", (req, res) => {
    res.send("Pong");
});
// Use error handler as the last middleware
app.use(errorMiddleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map