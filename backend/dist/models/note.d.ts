import { Document, Types } from "mongoose";
export interface INote extends Document {
    title: string;
    content: string;
    tenantId: Types.ObjectId;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Note: import("mongoose").Model<INote, {}, {}, {}, Document<unknown, {}, INote, {}, import("mongoose").DefaultSchemaOptions> & INote & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, INote>;
//# sourceMappingURL=note.d.ts.map