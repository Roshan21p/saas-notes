import { Document, model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Member";
  tenantId: Types.ObjectId;
  isInvited: boolean
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [4, "Name must be at least 4 characters"],
    },
    email: {
      type: String,
      required: true,
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
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    isInvited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//  Multi-tenant unique constraint
userSchema.index(
  { email: 1, tenantId: 1 },
  { unique: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // Skip hashing if password unchanged

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const User = model<IUser>("User", userSchema);
