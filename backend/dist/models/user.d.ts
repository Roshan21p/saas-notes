import { Document, Types } from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "Admin" | "Member";
    tenantId: Types.ObjectId;
    isInvited: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, IUser>;
//# sourceMappingURL=user.d.ts.map