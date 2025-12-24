import { Document, model, Schema, Types } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  tenantId: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'The title field is required'],
      minlength: [3, 'Title field required atleast 3 characters long']
    },
    content: {
      type: String,
      trim: true,
      required: true,
      minlength: [5, 'Content field required atleast 5 characters long']
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
    },
  },
  {
    timestamps: true,
  }
);

export const Note = model<INote>("Note", noteSchema);
