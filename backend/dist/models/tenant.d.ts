import { Document } from "mongoose";
export interface ITenant extends Document {
    name: string;
    slug: string;
    plan: "free" | "pro";
    noteLimit: number;
    createdAt: Date;
    updateAt: Date;
}
export declare const Tenant: import("mongoose").Model<ITenant, {}, {}, {}, Document<unknown, {}, ITenant, {}, import("mongoose").DefaultSchemaOptions> & ITenant & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any, ITenant>;
//# sourceMappingURL=tenant.d.ts.map