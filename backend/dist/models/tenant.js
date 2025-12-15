"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tenant = void 0;
// Import mongoose helpers:
// Document = TypeScript type for MongoDB document
// Schema   = Defines structure of tenant collection
// model    = Creates a Model to interact with MongoDB
const mongoose_1 = require("mongoose");
// Mongoose Schema = runtime validation
const tenantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true, // prevent two tenants having same slug
    },
    plan: {
        type: String,
        enum: ["free", "pro"],
        default: "free",
    },
    noteLimit: {
        type: Number,
        default: 3,
    },
}, {
    timestamps: true,
});
// Creates a MongoDB model named "Tenant"
// Collection name = tenants
exports.Tenant = (0, mongoose_1.model)("Tenant", tenantSchema);
//# sourceMappingURL=tenant.js.map