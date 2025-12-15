"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [4, "Name must be at least 4 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // <--- important
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Admin", "Member"],
        default: "Member",
    },
    tenantId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true,
    },
    isInvited: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
userSchema.pre("save", async function () {
    if (!this.isModified("password"))
        return; // Skip hashing if password unchanged
    const salt = await bcrypt_1.default.genSalt(10);
    this.password = await bcrypt_1.default.hash(this.password, salt);
});
exports.User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user.js.map