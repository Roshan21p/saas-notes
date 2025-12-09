import { Document,  model, Schema, Types } from "mongoose";

export interface INote extends Document {
    title: string;
    content: string;
    tenantId: Types.ObjectId;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const noteSchema = new Schema<INote>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tenantId: {
        type: Schema.Types.ObjectId,
        ref: "Tenant",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{
    timestamps: true
})

export const Note = model<INote>("Note", noteSchema);