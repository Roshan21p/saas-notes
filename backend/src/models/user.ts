import { Document, model, Schema, Types } from "mongoose"

export interface IUser extends Document {
    email: string;
    password: string;
    role: "Admin" | "Member";
    tenantId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,   // <--- important
        trim: true
    },
    password: {
        type: String,
        required: true
    },
   role: {
        type: String,
        enum: ["Admin", "Member"],
        default: "Member"
    },
    tenantId: {
        type: Schema.Types.ObjectId,
        ref: "Tenant",
        required: true
    }
}, {
    timestamps: true
})

export const User = model<IUser>("User", userSchema);