"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    console.error(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Interval Server Error";
    res.status(statusCode).json({ success: false, message });
}
//# sourceMappingURL=errorMiddleware.js.map